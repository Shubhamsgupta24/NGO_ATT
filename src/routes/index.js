const express=require('express');
// src/routes/homeRoutes.js
const HomeController = require('../controllers/home.Controller');
const router=express.Router();
// const router = express.Router();
const homeController = new HomeController();
const auth=require('../middleware/auth.middleware');

// here "auth" is acting as middleware for every request to home 
router.get('/',auth,homeController.getinfo);
router.use('/user', require('./user'));

module.exports=router;

