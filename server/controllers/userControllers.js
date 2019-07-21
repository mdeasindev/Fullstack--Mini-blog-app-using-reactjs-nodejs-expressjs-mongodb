const userValidators = require('../validators/userValidators');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModels');

const Register = async (req, res) => {
    const validate = userValidators(req.body);
    let errors = validate.errors;
    const { name, email, password, confirm_password } = req.body;

    if (!validate.isValid) {
        return res.status(404).json(errors);
    } else {

        const checkEmailDB = await userModel.findOne({ email });

        if(!checkEmailDB){
            bcrypt.hash(password, 10, function(err, hash) {
                if (!err ) {
                    const user = new userModel({
                        name,
                        email,
                        password: hash
                    });

                    user.save()
                        .then(result => {
                            return res.json({"message": "WoW! The Account has been created successfully."});
                        })
                        .catch(err => {
                            res.json(err);
                        });
                }
            });

        } else {
            errors.email = "This email already exists.";
            return res.status(404).json(errors);
        }
    }
    
}

module.exports = {
    Register
}