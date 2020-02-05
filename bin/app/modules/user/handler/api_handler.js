
const validator = require('./utils/validator');
const commandModel = require('./repositories/commands/commandModel');

const postDataLogin = async (req, res) => {
    const payload = req.body;
    const validatePayload = validator.isValidPayload(payload, commandModel.login);
    const postRequest = async (result) => {
        if (result.err) {
            return result;
        }
        return commandHandler.postDataLogin(result.data);
    };

    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, 'Login User')
            : wrapper.response(res, 'success', result, 'Login User', http.OK);
    };
    sendResponse(await postRequest(validatePayload));
};

const registerUser = async (req, res) => {
    const payload = req.body;
    const validatePayload = validator.isValidPayload(payload, commandModel.login);
    const postRequest = async (result) => {
        if (result.err) {
            return result;
        }
        return commandHandler.registerUser(result.data);
    };
    const sendResponse = async (result) => {
        /* eslint no-unused-expressions: [2, { allowTernary: true }] */
        (result.err) ? wrapper.response(res, 'fail', result, 'Register User', httpError.CONFLICT)
            : wrapper.response(res, 'success', result, 'Register User', http.OK);
    };
    sendResponse(await postRequest(validatePayload));
};
module.exports = {
    postDataLogin,
    registerUser
}