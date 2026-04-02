import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import secretKey from './config.js';

export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const header=req.headers['authorization'];
    const decoded=jwt.verify(header as string, secretKey);
    if(decoded){
        //@ts-ignore
        req.userID=decoded.id;
        next();
    }
    else{
        res.status(401).json({
            message:'Unauthorized',
        })
    }
}