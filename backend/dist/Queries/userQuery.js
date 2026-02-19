"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.createUser = void 0;
const user_1 = require("../models/user");
const createUser = async (data) => {
    return await user_1.User.create(data);
};
exports.createUser = createUser;
const getUserById = async (id) => {
    return await user_1.User.findById(id);
};
exports.getUserById = getUserById;
