const authService = require('../services/authService');
const sendJson = require('../utils/sendJson');
const parseJSONBody = require('../utils/parseQuery');

async function registerUser(req, res) {
    try {
        const data = req.body;
        const user = await authService.register(data);
        const { password, ...userData } = user.toObject();
        sendJson(res, 201, userData);
    } catch (e) {
        sendJson(res, 400, { error: "Bad Request", message: e.message });
    }
}

async function loginUser(req, res) {
    try {
        const data = req.body;
        const { user, token } = await authService.login(data);
        const { password, ...userData } = user.toObject();
        sendJson(res, 200, { user: userData, token });
    } catch (e) {
        sendJson(res, 400, { error: "Bad Request", message: e.message });
    }
}

module.exports = {
    registerUser,
    loginUser
};
