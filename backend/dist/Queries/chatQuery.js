"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChats = exports.getChatsBySession = exports.createChat = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const createChat = async (data) => {
    return await Chat_1.default.create(data);
};
exports.createChat = createChat;
const getChatsBySession = async (sessionId) => {
    return await Chat_1.default.find({ sessionId }).sort({ createdAt: 1 });
};
exports.getChatsBySession = getChatsBySession;
const getUserChats = async (userId) => {
    return await Chat_1.default.find({ userId }).sort({ createdAt: -1 });
};
exports.getUserChats = getUserChats;
