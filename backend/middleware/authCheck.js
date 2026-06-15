//import jwt
const jwt = require('jsonwebtoken')

exports.authCheck = async (req, res, next) => {
    try {

        //get token
        const token = req.headers.authorization

        //check token
        if (!token) throw new Error('Attached Token')

        //verify token
        const tokenVerify = jwt.verify(token, 'aabbcc')
        if (!tokenVerify) throw new Error('Invalid Token')

        req.user = tokenVerify

        //next page
        next()

    } catch (error) {

        return res.status(400).json({
            status: "Fail",
            message: error.message
        });
    }
}