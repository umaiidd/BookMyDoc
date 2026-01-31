import jwt from 'jsonwebtoken';

// Middleware to authenticate user using JWT
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Use req.user instead of req.body to store authenticated user info
        req.user = { userId: token_decode.id };
        
        next();
    } catch (error) {
        console.error('AUTH USER ERROR:', error);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;