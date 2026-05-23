const User = require("../models/userModel");
exports.findUserByEmail = async (email) => {
    return await User.findOne({email});

};

exports.createUser = async (userData) => {
    return await userData.create(userData);
}