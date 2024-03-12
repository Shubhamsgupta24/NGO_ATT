
const express=require('express');
// src/routes/homeRoutes.js
const TeacherController = require('../controllers/teacher.Controller');
const { route } = require('./user');
const router=express.Router();
// const router = express.Router();
const teacherController = new TeacherController();

// here "auth" is acting as middleware for every request to home 
router.get('/attendance',teacherController.AttendanceInfo);
router.post('/attendance',teacherController.Attendance);
router.post('/record-attendance',teacherController.Record);

router.get('/add_student',teacherController.AddStudent);
router.get('/fillattendance',teacherController.fillattendance_form);
router.get('/seeAttendance',teacherController.seeAttendance);
router.post('/seeAttendance',teacherController.SeeAndUpdateAttendance);
router.post('/fillattendance',teacherController.fillattendance);
router.post('/add_student',teacherController.RecordStudent);
router.post('/updated_sheet',teacherController.updateSheet);

module.exports=router;