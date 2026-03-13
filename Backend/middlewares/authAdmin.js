import jwt from 'jsonwebtoken';

// Middleware to authenticate admin using JWT
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET_KEY);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        next();
    } catch (error) {
        console.error('AUTH ADMIN ERROR:', error);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authAdmin;