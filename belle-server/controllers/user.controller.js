const { StatusCodes } = require('http-status-codes');
const UserModel = require('../models/user.model');
const APIError = require('../services/error.service');
const APIResponse = require('../services/response.service');

const getAllUsers = async (req, res, next) => {

    const users = await UserModel.find({});

    return APIResponse.ok('users fetched successfully');
};

const getUser = async(req, res) => {

    const { userId } = req.params;

    if (!userId) {
        return APIError.badRequest('userId is mandatory!');
    }

    const user = await UserModel.findOne({ userId });

    if (!user) {
        return APIResponse.notFound('userId is invalid');
    }

    return APIResponse.ok('property fetched successfully');
};

const updateUser = async(req, res) => {

    const payload = req.body;
    const { userId } = req.params;

    await UserModel.updateOne(
        { userId },
        { $set: { imageUrl: payload.imageUrl } },
        { upsert: false }
    );
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser
}
