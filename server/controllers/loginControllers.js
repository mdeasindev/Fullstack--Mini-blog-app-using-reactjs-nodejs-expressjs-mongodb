const loginValidated = require('../validators/loginValidators');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModels');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    const { email, password } = req.body;
    const loginValidate = loginValidated(req.body);
    const { isValid, errors } = loginValidate;

    if (!isValid) {
        return res.status(404).json(errors);     
    } else {
        const user = await userModel.findOne({ email });
        
        if (user) {
            bcrypt.compare(password, user.password, function (err, responose) {
                if(responose){
                    const payLoad = {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }

                    jwt.sign(payLoad, process.env.JWT_PRIVATE_KEY, {expiresIn: "2h"}, (err, token) => {
                        return res.json({
                            token,
                            message: "You have successfully loggedin."
                        });
                    });
                } else {
                    return res.status(404).json({ message: "Invalid Email and Password." });
                }
                
            });
        } else {
            return res.status(404).json({ message: "Invalid Email and Password." });
        }

        
    }
}

module.exports = {
    Login
}