import jwt from 'jsonwebtoken';
import secretKey from './config.js';
export const authMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    const decoded = jwt.verify(header, secretKey);
    if (decoded) {
        //@ts-ignore
        req.userID = decoded.id;
        next();
    }
    else {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
};
//# sourceMappingURL=middleware.js.map