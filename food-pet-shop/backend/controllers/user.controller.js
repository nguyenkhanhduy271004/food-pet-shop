// user.controller.js
import { getAccountUserService, loginUserService, registerUserService, refreshTokenService, listUserService, logoutUserService } from '../services/user.service.js';

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const response = await loginUserService(username, password);

    if (response.success) {
        res.cookie('accessToken', response.data.access_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_ACCESS_TOKEN });
        res.cookie('refreshToken', response.data.refresh_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_REFRESH_TOKEN });
    }
    return res.json(response);
};

const getAccountUser = async (req, res) => {
    const { refreshToken, accessToken } = req.body;

    const result = await getAccountUserService(refreshToken, accessToken);

    return res.status(result.status || 200).json(result);
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const response = await registerUserService(username, password);

    if (response.success) {
        res.cookie('accessToken', response.data.access_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_ACCESS_TOKEN });
        res.cookie('refreshToken', response.data.refresh_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_REFRESH_TOKEN });
    }
    return res.json(response);
};

const refreshTokenUser = async (req, res) => {
    const { refreshToken } = req.cookies;
    const response = await refreshTokenService(refreshToken);

    if (response.success) {
        res.cookie('accessToken', response.access_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_ACCESS_TOKEN });
    }
    return res.status(response.status || 200).json(response);
};

const listUser = async (req, res) => {
    const response = await listUserService();
    return res.json(response);
};

const logoutUser = async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    const response = logoutUserService();
    return res.json(response);
};

export { getAccountUser, loginUser, registerUser, refreshTokenUser, listUser, logoutUser };
