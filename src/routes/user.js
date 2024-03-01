
const express = require('express');
const UserController = require('../controllers/user.Controller');
const auth=require('../middleware/auth.middleware');

const router = express.Router();
const userController = new UserController();

// Define routes for the user module
router.get('/sign_in', userController.signIn);
router.get('/sign_up', userController.signUp);
router.post('/create-session',userController.createSession);
router.get('/logout',userController.logout);
router.post('/create',userController.create);

module.exports = router;



