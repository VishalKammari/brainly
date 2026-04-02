import express from 'express';
import mongoose from 'mongoose';
import { UserModel, ContentModel } from './db.js';
import jwt from 'jsonwebtoken';
import secretKey from './config.js';
import { authMiddleware } from './middleware.js';
const app = express();
app.use(express.json());
app.post('/api/v1/signup', async (req, res) => {
    console.log("BODY:", req.body);
    const username = req.body.username;
    const password = req.body.password;
    try {
        await UserModel.create({
            username: username,
            password: password,
        });
        res.json({
            message: 'User created successfully',
        });
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(411).json({
            message: 'user already exist',
        });
    }
});
app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existingUser = await UserModel.findOne({ username: username, password: password });
        if (existingUser) {
            const token = jwt.sign({
                id: existingUser._id
            }, secretKey);
            res.json({
                message: 'User signed in successfully',
                token: token
            });
        }
        else {
            res.status(401).json({
                message: 'Invalid username or password',
            });
        }
    }
    catch (err) {
        res.status(401).json({
            message: 'Invalid username or password',
        });
    }
});
app.post('/api/v1/content', authMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        //@ts-ignore
        type,
        //@ts-ignore
        userId: req.userID,
        tags: [],
    });
    res.json({
        message: 'Content added successfully',
    });
});
app.get('/api/v1/content', authMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.body.userId;
    const content = await ContentModel.find({ userId: userId }).populate('userId', 'username');
    res.json({ content });
});
app.delete('/api/v1/content', (req, res) => {
});
app.post('/api/v1/brain/share', (req, res) => {
});
app.get('/api/v1/brain/:shareLink', (req, res) => {
});
app.listen(3000);
//# sourceMappingURL=index.js.map