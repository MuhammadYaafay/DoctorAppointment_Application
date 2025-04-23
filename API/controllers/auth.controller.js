const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { hashedPassword, comparePassword } = require("../utils/password");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: "Validation failed",
        errors: errors.array() 
      });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    const hashPassword = await hashedPassword(password);

    const [newUser] = await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES(?,?,?,?)`,
      [name, email, hashPassword, role || "patient"]
    );

    //doctor register
    if (req.body.role === "doctor") {
      const { specialization, experience, fee } = req.body;
      await pool.query(
        `INSERT INTO doctors(user_id, specialization, experience, fee) VALUES (?, ?, ?, ?)`,
        [newUser.insertId, specialization, experience, fee]
      );
    }

    res.status(201).json({ 
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.insertId,
        name,
        email,
        role: role || "patient"
      }
    });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ 
      success: false,
      message: "Registration failed",
      error: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(', ');
      return res.status(400).json({ 
        success: false,
        message: errorMessages
      });
    }

    const { email, password } = req.body;

    //if admin
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          id: "admin",
          role: "admin",
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.json({
        success: true,
        token,
        user: {
          id: "admin",
          name: "Admin",
          email: process.env.ADMIN_EMAIL,
          role: "admin",
        },
      });
    }

    //get user
    const [users] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    if (users.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "User not found" 
      });
    }
    const user = users[0];

    //check password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid password" 
      });
    }

    //If user is doctor
    let doctorDetails = null;
    if (user.role === "doctor") {
      const [doctors] = await pool.query(
        `SELECT * FROM doctors WHERE user_id = ?`,
        [user.id]
      );

      if (doctors.length === 0) {
        return res.status(400).json({ 
          success: false,
          message: "Doctor record not found" 
        });
      }

      const doctor = doctors[0];

      if (doctor.is_approved === 0) {
        return res.status(403).json({ 
          success: false,
          message: "Doctor account is pending approval by admin" 
        });
      }

      doctorDetails = doctor;
    }

    //generate jwt
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        doctorId: doctorDetails?.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        doctorDetails,
      },
    });
  } catch (error) {
    console.error("login error", error);
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

const getProfile = async (req, res) => {
  try {
    //user(patient) details
    const [users] = await pool.query(
      `SELECT id, name, email, role, image_url, created_at FROM users WHERE id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    //doctor details
    if (user.role === "doctor") {
      const [doctors] = await pool.query(
        `SELECT * FROM doctors WHERE user_id = ?`,
        [user.id]
      );

      if (doctors.length > 0) {
        user.doctorDetails = doctors[0];
      }
    }

    //admin details
    if (user.role === "admin") {
      const [admins] = await pool.query(
        `SELECT * FROM admins WHERE user_id = ?`,
        [user.id]
      );
      if (admins.length > 0) {
        user.adminDetails = admins[0];
      }
    }

    res.json(user);
  } catch (error) {
    console.error("get profile error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    console.log(`User ${req.user.id} logged out`);
    // No need to remove token on server (client handles that)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  logout,
};
