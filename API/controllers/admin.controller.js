const pool = require("../config/db");

const getAllDoctors = async (req, res) => {
  try {
    const [doctors] = await pool.query(`
      SELECT 
        d.id,
        u.name,
        d.specialization AS specialty,
        u.email,
        u.phone,
        d.experience,
        d.rating,
        d.reviews_count,
        d.fee,
        u.image_url AS image,
        d.is_approved
      FROM doctors d
      INNER JOIN users u ON d.user_id = u.id
    `);

    res.json(doctors);
  } catch (error) {
    console.error("Get all doctors error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Total appointments and their statuses
    const [appointments] = await pool.query(`
      SELECT 
        COUNT(*) AS totalAppointments
      FROM appointments
    `);

    // Total earnings from completed payments
    const [earnings] = await pool.query(`
      SELECT SUM(amount) AS totalEarnings
      FROM payments
      WHERE payment_status = 'completed'
    `);

    // Total users by role
    const [users] = await pool.query(`
      SELECT 
        role,
        COUNT(*) AS count
      FROM users
      GROUP BY role
    `);

    // Recent appointments
    const [recentAppointments] = await pool.query(`
      SELECT 
        a.id, a.appointment_date AS date, a.appointment_time AS time, a.status,
        u.name AS patientName,
        doc.name AS doctorName
      FROM appointments a
      INNER JOIN users u ON a.user_id = u.id
      INNER JOIN doctors d ON a.doctor_id = d.id
      INNER JOIN users doc ON d.user_id = doc.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);

    // Top performing doctors
    const [topDoctors] = await pool.query(`
      SELECT 
        d.id, 
        u.name, 
        d.specialization AS specialty,
        COUNT(a.id) AS appointments,
        IFNULL(AVG(r.rating), 0) AS rating
      FROM doctors d
      INNER JOIN users u ON d.user_id = u.id
      LEFT JOIN appointments a ON d.id = a.doctor_id
      LEFT JOIN reviews r ON d.id = r.doctor_id
      GROUP BY d.id
      ORDER BY appointments DESC
      LIMIT 5
    `);

    const userCount = users.reduce((acc, curr) => {
      acc[curr.role] = curr.count;
      return acc;
    }, {});

    res.json({
      totalDoctors: userCount.doctor || 0,
      totalPatients: userCount.patient || 0,
      totalAppointments: appointments[0]?.totalAppointments || 0,
      revenue: earnings[0]?.totalEarnings || 0,
      doctorsGrowth: 10, // dummy value, you can calculate based on previous months data
      patientsGrowth: 8, // dummy value
      appointmentsGrowth: 12, // dummy value
      revenueGrowth: 15, // dummy value
      recentAppointments,
      topDoctors,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all pending doctors
const getPendingDoctors = async (req, res) => {
  try {
    const [doctors] = await pool.query(`
      SELECT 
        d.id, d.specialization, d.experience, d.fee,
        u.name, u.email, u.created_at
      FROM doctors d
      INNER JOIN users u ON d.user_id = u.id
      WHERE d.is_approved = 0
    `);

    res.json(doctors);
  } catch (error) {
    console.error("Get pending doctors error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve a doctor's registration
const approveDoctorRegistration = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const [doctors] = await pool.query(
      "SELECT * FROM doctors WHERE id = ? AND is_approved = 0",
      [doctorId]
    );

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "Doctor not found or already approved" });
    }

    await pool.query("UPDATE doctors SET is_approved = 1 WHERE id = ?", [
      doctorId,
    ]);

    res.json({ message: "Doctor approved successfully" });
  } catch (error) {
    console.error("Approve doctor error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// reject a doctor's registration
const rejectDoctorRegistration = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const [doctors] = await pool.query("SELECT user_id FROM doctors WHERE id = ?", [doctorId]);

    if (doctors.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    await pool.query("DELETE FROM users WHERE id = ?", [doctors[0].user_id]);

    await pool.query("DELETE FROM doctors WHERE user_id = ?", [doctors[0].user_id]);

    res.json({ message: "Doctor and user rejected successfully" });
  } catch (error) {
    console.error("Reject doctor error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users except admins
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT id, name, email, phone, created_at AS registered_date
      FROM users
      WHERE role != 'admin'
      ORDER BY created_at DESC
    `);

    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const [appointments] = await pool.query(`
      SELECT 
        a.id, a.appointment_date, a.appointment_time, 
        a.status, a.payment_status,
        u.name AS patient_name,
        u.email AS patient_email,
        d.specialization,
        doc.name AS doctor_name,
        p.amount
      FROM appointments a
      INNER JOIN users u ON a.user_id = u.id
      INNER JOIN doctors d ON a.doctor_id = d.id
      INNER JOIN users doc ON d.user_id = doc.id
      LEFT JOIN payments p ON a.id = p.appointment_id
      ORDER BY a.created_at DESC
    `);

    res.json(appointments);
  } catch (error) {
    console.error("Get all appointments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const cancelAppointmentByAdmin = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const [appointments] = await pool.query(
      'SELECT * FROM appointments WHERE id = ? AND status != "cancelled"',
      [appointmentId]
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "Appointment not found or already cancelled" });
    }

    await pool.query(
      'UPDATE appointments, payments SET status = "cancelled", payment_status = "failed" WHERE appointments.id = ? AND payments.appointment_id = ?',
      [appointmentId, appointmentId]
    );

    await pool.query(
      'UPDATE users SET total_appointments = total_appointments - 1 WHERE id = ?',
      [appointments[0].user_id]
    );

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Cancel appointment by admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const confirmAppointmentByAdmin = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const [appointments] = await pool.query(
      'SELECT * FROM appointments WHERE id = ? AND status != "confirmed"',
      [appointmentId]
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "Appointment not found or already confirmed" });
    }

    await pool.query(
      'UPDATE appointments SET status = "confirmed" WHERE id = ?',
      [appointmentId]
    );

    res.json({ message: "Appointment confirmed successfully" });
  } catch (error) {
    console.error("Confirm appointment by admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const completeAppointmentByAdmin = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const [appointments] = await pool.query(
      'SELECT * FROM appointments WHERE id = ? AND status != "completed"',
      [appointmentId]
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "Appointment not found or already completed" });
    }

    await pool.query(
      'UPDATE appointments SET status = "completed" WHERE id = ?',
      [appointmentId]
    );

    await pool.query(
      'UPDATE payments SET payment_status = "completed" WHERE appointment_id = ?',
      [appointmentId]
    );

    await pool.query(
      'UPDATE users SET total_appointments = total_appointments + 1 WHERE id = ?',
      [appointments[0].user_id]
    );

    res.json({ message: "Appointment completed successfully" });
  } catch (error) {
    console.error("Complete appointment by admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const [patients] = await pool.query(`
      SELECT id, name, email, phone, created_at AS registered_date, total_appointments
      FROM users
      WHERE role = 'patient'
      ORDER BY created_at DESC
    `);

    res.json(patients);
  } catch (error) {
    console.error("Get all patients error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  getAllDoctors,
  getDashboardStats,
  getPendingDoctors,
  approveDoctorRegistration,
  rejectDoctorRegistration,
  getAllUsers,
  getAllAppointments,
  cancelAppointmentByAdmin,
  confirmAppointmentByAdmin,
  completeAppointmentByAdmin,
  getAllPatients
};
