//role middleware

exports.roleCheck = (...roles) => {

    return (req, res, next) => {

        console.log("Allowed Roles:", roles);
        console.log("Current User:", req.user);

        if (!roles.includes(req.user.role)) {
           return res.status(403).json({
                status: 'Fail',
                message: 'Access Denied'
            })
        }

        //next page
        next()

    }
}