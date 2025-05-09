const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { hashedPassword, comparePassword } = require("../utils/password");
const path = require('path');

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
        avatar: user.image_url,
        phone: user.phone,
        medicalHistory: {
          allergies: user.allergies,
          chronicConditions: user.chronic_conditions,
          currentMedications: user.current_medications,
          pastSurgeries: user.past_surgeries,
        },
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
    // user(patient) details
    const [users] = await pool.query(
      `SELECT 
        id, 
        name, 
        email, 
        role, 
        image_url AS avatar, 
        COALESCE(phone, '') AS phone, 
        COALESCE(allergies, '') AS allergies, 
        COALESCE(chronic_conditions, '') AS chronic_conditions, 
        COALESCE(current_medications, '') AS current_medications, 
        COALESCE(past_surgeries, '') AS past_surgeries 
       FROM users 
       WHERE id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // Ensure medical history always has consistent structure
    user.medicalHistory = {
      allergies: user.allergies || null,
      chronicConditions: user.chronic_conditions || null,
      currentMedications: user.current_medications || null,
      pastSurgeries: user.past_surgeries || null,
    };

    // Remove the original flat fields to avoid confusion
    delete user.allergies;
    delete user.chronic_conditions;
    delete user.current_medications;
    delete user.past_surgeries;

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

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: "Validation failed",
        errors: errors.array() 
      });
    }

    const { name, phone, medicalHistory, doctorDetails } = req.body;
    const userId = req.user.id;

    // Update basic user info
    await pool.query(
      `UPDATE users SET name = ?, phone = ?, allergies = ?, chronic_conditions = ?, current_medications = ?, past_surgeries = ? WHERE id = ?`,
      [
        name,
        phone,
        medicalHistory?.allergies,
        medicalHistory?.chronicConditions,
        medicalHistory?.currentMedications,
        medicalHistory?.pastSurgeries,
        userId,
      ]
    );

    // If user is a doctor, update doctor details
    if (req.user.role === "doctor" && doctorDetails) {
      await pool.query(
        `UPDATE doctors SET specialization = ?, experience = ?, fee = ? WHERE user_id = ?`,
        [doctorDetails.specialization, doctorDetails.experience, doctorDetails.fee, userId]
      );
    }

    // Get updated user data
    const [users] = await pool.query(
      `SELECT id, name, email, role, image_url AS avatar, phone, allergies, chronic_conditions, current_medications, past_surgeries FROM users WHERE id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    const user = users[0];

    // Nest medical history
    user.medicalHistory = {
      allergies: user.allergies,
      chronicConditions: user.chronic_conditions,
      currentMedications: user.current_medications,
      pastSurgeries: user.past_surgeries,
    };

    // Get doctor details if applicable
    if (user.role === "doctor") {
      const [doctors] = await pool.query(
        `SELECT * FROM doctors WHERE user_id = ?`,
        [userId]
      );
      if (doctors.length > 0) {
        user.doctorDetails = doctors[0];
      }
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Update profile picture
const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const userId = req.user.id;
    const imageUrl = `/uploads/${req.file.filename}`;

    // Update user's profile picture
    await pool.query(
      `UPDATE users SET image_url = ? WHERE id = ?`,
      [imageUrl, userId]
    );

    // Get updated user data
    const [users] = await pool.query(
      `SELECT id, name, email, role, image_url FROM users WHERE id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const user = users[0];

    res.json({
      success: true,
      message: "Profile picture updated successfully",
      user
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  logout,
  updateProfile,
  updateProfilePicture
};
