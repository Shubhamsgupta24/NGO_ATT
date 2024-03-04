
const express = require('express');
const SchoolController = require('../controllers/school.Controller');
const auth=require('../middleware/auth.middleware');

const router = express.Router();
const schoolController = new SchoolController();

router.get('/getinfo',schoolController.getinfo);


module.exports = router;