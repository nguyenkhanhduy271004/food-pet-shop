import jwt from 'jsonwebtoken'
import { refreshTokenUser } from '../controllers/user.controller.js';

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token && req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Login Again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.body = {
            ...req.body,
            accessToken: token,
            userId: token_decode.id,
            token_decode: token_decode,
            refreshToken: req.cookies.refreshToken,
        };

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return refreshTokenUser(req, res);
        }
        console.log(err);
        return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
    }
}

const authIsAdminTest = (req, res) => {
    try {
        const { isAdmin } = req.body.token_decode.isAdmin;

        if (isAdmin) {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Not authorized to access' });
        }
    } catch (error) {
        console.log(error);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
        }
        console.log(err);
        return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
    }
}



const authIsAdmin = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token && req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Login Again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (token_decode.isAdmin) {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Not authorized to access' });
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
        }
        console.log(err);
        return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
    }
};

export { authMiddleware, authIsAdmin }