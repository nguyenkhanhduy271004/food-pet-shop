import jwt from 'jsonwebtoken'
import { refreshTokenUser } from '../controllers/userController.js';

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
        req.body.userId = token_decode.id;
        req.body.accessToken = token;
        req.body.refreshToken = req.cookies.refreshToken;

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return refreshTokenUser(req, res);
        }
        console.log(err);
        return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
    }
}



const authIsAdmin = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.json({ success: false, message: 'Not authorized. Login Again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode.isAdmin) {
            next();
        } else {
            return res.json({ success: false, message: 'Not authorized to access' });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Invalid token. Please login again.' });
    }
};

export default authMiddleware