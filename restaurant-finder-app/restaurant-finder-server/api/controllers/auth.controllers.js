const User = require('./../models/user.model')

exports.loginUser = (req,res) => {
    let userDetails = req.body;
    User.findOne({ email: userDetails.email.toLowerCase() }, (err, user) =>{
        if(err) {
            res.status(500).send({
                status: 0,
                message: 'error logging in user',
                error: 'problem with the server'
            })
        } else if(!user){
            res.status(401).send({
                status: 0,
                message: 'no user found',
                error: 'invalid credentials'
            })
        } else if (!user.comparePassword(userDetails.password)) {
            res.status(401).send({
                status: 0,
                message: "invalid password",
                error: 'invalid credentials'
            });
        } else {
            res.status(200).send({
                status: 1,
                message: "logged in successfully"
            });
        }
    })
}