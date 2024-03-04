
const express = require('express');
const AdminController = require('../controllers/admin.Controller');
const auth=require('../middleware/auth.middleware');

const router = express.Router();
const adminController = new AdminController();

router.get('/attendance',adminController.attendanceInfo);
router.post('/attendance',adminController.attendance);

module.exports = router;