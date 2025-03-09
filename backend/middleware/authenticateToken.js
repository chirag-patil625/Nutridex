const jwt = require('jsonwebtoken');
const User = require('../model/User');

const JWT_SECRET = 'nutridex';

const authenticateToken = async (req, res, next) => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            return res.status(401).json({
                message: "Access Denied"
            })
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.user);
        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user;
        next();
    }
    catch(err){
        return res.status(403).json({
            message: "Invalid token"
        })
    }
};

module.exports = authenticateToken;