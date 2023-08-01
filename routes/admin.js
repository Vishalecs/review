const express = require('express');
const router =express.Router();
const passport = require('passport');
const adminController = require('../controllers/admin_controller');

// It will assign the work to the employeess
router.get('/assignWork' , passport.checkAuthentication , adminController.assignWork);

// THis is help to view the employee
router.get('/view-employee' , passport.checkAuthentication , adminController.showEmployeeList);
// It will help to set the reviews, 
router.post('/setReviewes' , passport.checkAuthentication , adminController.setReviewrAndReviewe);
// This router will make new Admin
router.post('/newAdmin' , passport.checkAuthentication , adminController.newAdmin);
// It will delete the employee
router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);
// it will add the employee
router.get('/add-employee' , passport.checkAuthentication , adminController.addEmployee);
router.get('/promoteEmployee/:id', adminController.promoteEmployee);

module.exports = router;