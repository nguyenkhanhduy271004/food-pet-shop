import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateAccessToken = (data) => {
    const access_token = jwt.sign({ id: data._id, isAdmin: data.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return access_token;
};

const generateRefreshToken = (data) => {
    const refresh_token = jwt.sign({ id: data._id, isAdmin: data.isAdmin }, process.env.JWT_SECRET, { expiresIn: '365d' });
    return refresh_token;
};

const getAccountUserService = async (refreshToken, accessToken) => {
    if (!refreshToken || !accessToken) {
        return { success: false, status: 400, message: 'Missing tokens' };
    }

    try {
        return { success: true, data: { access_token: accessToken, refresh_token: refreshToken } };
    } catch (error) {
        console.error('Error getting account tokens:', error);
        return { success: false, status: 500, message: 'Server error' };
    }
};

const loginUserService = async (username, password) => {
    const user = await userModel.findOne({ username });
    if (!user) {
        return { success: false, message: "Invalid Username/Password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { success: false, message: "Invalid credentials" };
    }

    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    if (!user.isAdmin) {
        return { success: true, data: { access_token, refresh_token } };
    } else {
        return { success: true, data: { access_token, refresh_token, isAdmin: user.isAdmin } };
    }
};

const registerUserService = async (username, password) => {
    const exists = await userModel.findOne({ username });
    if (exists) {
        return { success: false, message: 'User already exists' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
        username: username,
        password: hashedPassword
    });

    const user = await newUser.save();

    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    return { success: true, data: { access_token, refresh_token } };
};

const refreshTokenService = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const newAccessToken = generateAccessToken(decoded);
        return { success: true, access_token: newAccessToken };
    } catch (error) {
        return { success: false, message: 'Invalid refresh token', status: 401 };
    }
};

const listUserService = async () => {
    try {
        const users = await userModel.find({});
        return { success: true, data: users };
    } catch (error) {
        return { success: false, message: 'Error fetching users' };
    }
};

const logoutUserService = () => {
    return { success: true, message: 'User logged out' };
};

export { getAccountUserService, loginUserService, registerUserService, refreshTokenService, listUserService, logoutUserService };
