const validator = require('validator');

const userValidate = body => {
    let errors = {};

    if (!body.name) {
        errors.name = "Name is required."
    }

    if (!body.email) {
        errors.email = "Email is required."
    } else if(!validator.isEmail(body.email)) {
        errors.email = "Email is not valid."
    }

    if (!body.password) {
        errors.password = "Password is required."
    } else if(body.password.length < 6){
        errors.password = "password should be atleast 6 character.";
    }

    if (!body.confirm_password) {
        errors.confirm_password = "Confirm password is required."
    } else if(body.confirm_password.length < 6){
        errors.confirm_password = "Confirm password should be atleast 6 character.";
    } else if (body.password !== body.confirm_password) {
        errors.confirm_password = "Confirm password did not match with password."
    }

    return ({
        errors,
        isValid: Object.keys(errors).length === 0
    });

}

module.exports = userValidate;