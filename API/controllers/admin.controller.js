const pool = require("../config/db");

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
      WHERE status = 'completed'
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

// Get all users except admins
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT id, name, email, role, created_at
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

// Cancel appointment by admin
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
      'UPDATE appointments SET status = "cancelled" WHERE id = ?',
      [appointmentId]
    );

    await pool.query(
      'UPDATE payments SET payment_status = "cancelled" WHERE appointment_id = ?',
      [appointmentId]
    );

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Cancel appointment by admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDashboardStats,
  getPendingDoctors,
  approveDoctorRegistration,
  getAllUsers,
  getAllAppointments,
  cancelAppointmentByAdmin,
};
