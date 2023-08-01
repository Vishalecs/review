const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const userController = require('../controllers/user_controller');

//it will redirect to the home page
router.get('/',homeController.home);


router.use('/users', require('./users'));

router.use('/admin', require('./admin'));

router.use('/reviews', require('./reviews'));
// Route for editing an employee
router.get('/admin/editEmployee/:id', userController.editEmployee);
router.post('/admin/updateEmployee/:id', userController.updateEmployee);


module.exports = router;