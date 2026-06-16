var express = require('express');
var router = express.Router();

//import controller
const EC = require('../controller/employeeController')

//import middleware
const AUTH = require('../middleware/authCheck')
const ROLE = require('../middleware/roleCheck')

router.get('/', (req, res) => {
    res.send('hello user')
})

//create employee router
router.post('/create',AUTH.authCheck,ROLE.roleCheck('admin'),EC.createEmployee)

//getAll employee router
router.get('/get-all',AUTH.authCheck,ROLE.roleCheck('admin'),EC.getAllEmployee)

//getSingle employee router
router.get('/get-single/:id',AUTH.authCheck,ROLE.roleCheck('admin','employee'),EC.getSingleEmployee)

//updateEmployee router
router.patch('/update/:id',AUTH.authCheck,ROLE.roleCheck('admin'),EC.updateEmployee)

//deleteEmployee router
router.delete('/delete/:id',AUTH.authCheck,ROLE.roleCheck('admin'),EC.deleteEmployee)

//dashboard stats router
router.get('/dashboard-stats',AUTH.authCheck,ROLE.roleCheck('admin'),EC.dashboardCheck)

module.exports = router;
