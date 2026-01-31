import jwt from 'jsonwebtoken';

// Middleware to authenticate doctor using JWT
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);
        
        // Use req.user instead of req.body to store authenticated doctor info
        req.user = { docId: token_decode.id };
        
        next();
    } catch (error) {
        console.error('AUTH DOCTOR ERROR:', error);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authDoctor;