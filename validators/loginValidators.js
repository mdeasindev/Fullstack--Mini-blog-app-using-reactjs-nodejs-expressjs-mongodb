const validator = require('validator');

const loginValidated = body => {
    const { email, password } = body;
    let errors = {};

    if (!email) {
        errors.email = "Email is required.";
    } else if (!validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    if (!password) {
        errors.password = "Password is required."
    }

    return ({
        errors,
        isValid: Object.keys(errors).length === 0
    });
}

module.exports = loginValidated;