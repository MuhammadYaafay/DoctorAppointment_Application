const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const {
  getAllDoctors,
  getDashboardStats,
  getPendingDoctors,
  approveDoctorRegistration,
  rejectDoctorRegistration,
  getAllUsers,
  getAllAppointments,
  cancelAppointmentByAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();

//all routes require admin authentication
router.use(verifyToken, isAdmin);

//Get all doctors
router.get('/doctors', getAllDoctors);

//dashboard and stats
router.get('/dashboard', getDashboardStats);

//Doctor management 
router.get('/doctors/pending', getPendingDoctors);
router.patch('/doctors/:id/approve', approveDoctorRegistration);
router.delete('/doctors/:id/reject', rejectDoctorRegistration);

//user management
router.get('/users', getAllUsers);

//appointment management
router.get('/appointments', getAllAppointments);
router.patch('/appointments/:id/cancel', cancelAppointmentByAdmin);

module.exports = router;
