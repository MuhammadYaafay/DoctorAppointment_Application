const { validationResult } = require("express-validator");
const pool = require("../config/db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { doctorId, appointmentDate, appointmentTime } = req.body;

    const [doctors] = await pool.query(
      `SELECT d.*, u.name 
       FROM doctors d
       JOIN users u ON d.user_id = u.id
       WHERE d.id = ? AND d.is_approved = 1`,
      [doctorId]
    );

    if (doctors.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctor = doctors[0];

    //check if slots available
    const [existingAppointments] = await pool.query(
      `SELECT * FROM appointments WHERE doctor_id = ? 
        AND appointment_date = ? AND appointment_time = ?
        AND status!='cancelled'`,
      [doctorId, appointmentDate, appointmentTime]
    );

    if (existingAppointments.length > 0) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    //create appointment
    const [newAppointment] = await pool.query(
      `INSERT INTO appointments (user_id, doctor_id, appointment_date, appointment_time, status, payment_status)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, doctorId, appointmentDate, appointmentTime, "pending", "pending"]
    );

    // create stripe order
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Appointment with Dr. ${doctor.name}`,
              description: `${appointmentDate} at ${appointmentTime}`
            },
            unit_amount: Math.round((doctor.fee + 5) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.DOMAIN}/appointments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/appointments?doctorId=${doctorId}`,
      metadata: {
        appointmentId: newAppointment.insertId.toString(),
        userId: req.user.id.toString(),
        doctorId: doctorId.toString()
      },
    });

    //save payment details
    await pool.query(
      `INSERT INTO payments (appointment_id, amount, razorpay_order_id, status)
        VALUES (?, ?, ?, ?)`,
      [newAppointment.insertId, doctor.fee+5, session.id, "pending"]
    );

    res.json({
      url: session.url,
      appointmentId: newAppointment.insertId
    });

  } catch (error) {
    console.log("create appointment errror", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const appointmentId = session.metadata.appointmentId;

      //update payment status
      await pool.query(
        `UPDATE payments SET status = 'paid', razorpay_payment_id = ?
        WHERE razorpay_order_id = ?`,
        [session.payment_intent, session.id]
      );

      //update appointment status
      const [payments] = await pool.query(
        `SELECT appointment_id FROM payments WHERE razorpay_order_id=?`,
        [session.payment_intent]
      );

      await pool.query(
        `UPDATE appointments SET status = ?, payment_status = ? WHERE id = ?`,
        ["confirmed", "completed", appointmentId]
      );
    }

    res.json({ message: "Payment verified successfully" });
  } catch (error) {
    console.log({ recieved: true }, "verify payment error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const [appointments] = await pool.query(
      `SELECT 
           a.id AS id,
           a.appointment_date AS date,
           a.appointment_time AS time,
           a.status AS status,
           a.payment_status AS paymentStatus,
           d.specialization AS doctorSpecialty,
           d.fee AS fee,
           u.name AS doctorName,
           u.image_url AS doctorImage
         FROM appointments a
         JOIN doctors d ON a.doctor_id = d.id
         JOIN users u ON d.user_id = u.id
         WHERE a.user_id = ?
         ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
      [req.user.id]
    );
    res.json(appointments);
  } catch (error) {
    console.log("get user appointments error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    //verify appointment belong to user and is not in past
    const [appointments] = await pool.query(
      `SELECT * FROM appointments WHERE id = ? AND user_id = ? AND appointment_date > CURDATE() AND status != 'cancelled'`,
      [appointmentId, req.user.id]
    );

    if (appointments.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await pool.query(`UPDATE appointments SET status = ? WHERE id = ?`, [
      "cancelled",
      appointmentId,
    ]);

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log("cancel appointment error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createAppointment,
  verifyPayment,
  getUserAppointments,
  cancelAppointment,
};
