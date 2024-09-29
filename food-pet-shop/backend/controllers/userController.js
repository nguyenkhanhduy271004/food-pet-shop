import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const getAccountUser = async (req, res) => {
    const { refreshToken, accessToken } = req.body
    try {
        return res.json({ success: true, data: { access_token: accessToken, refresh_token: refreshToken } })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error' })
    }
}

const refreshTokenUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const newAccessToken = generateAccessToken(decoded);
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_ACCESS_TOKEN });

            return res.json({ success: true, access_token: newAccessToken });
        } else {
            return res.status(401).json({ success: false, message: 'The refreshToken is not valid' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Error' });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userModel.findOne({ username })
        if (!user) {
            return res.json({ success: false, message: "Invalid Username/Password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const access_token = generateAccessToken(user)
        const refresh_token = generateRefreshToken(user)

        res.cookie('accessToken', access_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_ACCESS_TOKEN });
        res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_REFRESH_TOKEN });

        return res.json({ success: true, data: { access_token, refresh_token } })

    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "Error" })
    }
}

const generateAccessToken = (data) => {
    const access_token = jwt.sign({ id: data._id, isAdmin: data.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' })
    return access_token
}

const generateRefreshToken = (data) => {
    const refresh_token = jwt.sign({ id: data._id, isAdmin: data.isAdmin }, process.env.JWT_SECRET, { expiresIn: '365d' })
    return refresh_token
}

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const exists = await userModel.findOne({ username });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
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

        res.cookie('accessToken', access_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_ACCESS_TOKEN });
        res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: +process.env.MAX_AGE_REFRESH_TOKEN });

        res.json({ success: true, data: { access_token, refresh_token } });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Error' });
    }
};


const listUser = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.json({ success: true, data: users })
    } catch (error) {
        console.log(err)
        res.json({ success: false, message: 'Error' })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return res.status(200).json({ success: true, message: 'User logged out' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Error' })
    }
}

export { getAccountUser, refreshTokenUser, loginUser, registerUser, listUser, logoutUser }