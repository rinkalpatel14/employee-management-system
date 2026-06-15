var express = require('express');
var router = express.Router();

//import controller
let UC = require('../controller/userController')

//import middleware
let AUTH = require('../middleware/authCheck')

//import multer
const multer = require('multer')

//multer code
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

//get profile
router.get('/profile', AUTH.authCheck, UC.profile)

//register  router
router.post('/register', upload.single('profileImage'), UC.registerUser)

//login router
router.post('/login', UC.loginUser)

//get Employee-User router
router.get('/employee-users',UC.getEmployeeUsers)

module.exports = router;
