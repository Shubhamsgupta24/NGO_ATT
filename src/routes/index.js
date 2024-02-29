const express=require('express');
// src/routes/homeRoutes.js
const HomeController = require('../controllers/home.Controller');
const router=express.Router();
// const router = express.Router();
const homeController = new HomeController();

router.get('/', homeController.getinfo);
router.use('/user', require('./user'));

module.exports=router;

