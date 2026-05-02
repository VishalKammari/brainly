import express from 'express';
import mongoose from 'mongoose';
import { UserModel, ContentModel, LinkModel } from './db.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import secretKey from './config.js';
import { authMiddleware } from './middleware.js';
import { random } from './utils.js';
import bcrypt from 'bcrypt';
const app = express();
app.set('json spaces', 2);
app.use(express.json());
app.use(cors());
app.post('/api/v1/signup', async (req, res) => {
    // console.log("BODY:", req.body);
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            username: username,
            password: hashedPassword,
        });
        res.json({
            message: 'User created successfully',
        });
    }
    catch (err) {
        // console.error("Error creating user:", err);
        res.status(409).json({
            message: 'user already exist',
        });
    }
});
app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existingUser = await UserModel.findOne({ username: username });
        if (!existingUser) {
            return res.status(401).json({
                message: 'Invalid username or password',
            });
        }
        const ismatch = await bcrypt.compare(password, existingUser.password);
        if (!ismatch) {
            return res.status(401).json({
                message: 'Invalid username or password',
            });
        }
        const token = jwt.sign({
            id: existingUser._id
        }, secretKey);
        res.json({
            message: 'User signed in successfully',
            token: token
        });
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
    const title = req.body.title;
    await ContentModel.create({
        link,
        title,
        //@ts-ignore
        type,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.json({
        message: 'Content added successfully',
    });
});
app.get('/api/v1/content', authMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({ userId: userId }).populate('userId', 'username');
    res.json({ content });
});
app.delete('/api/v1/content', authMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        "_id": contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Deleted"
    });
});
app.post('/api/v1/brain/share', authMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash,
            });
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash,
        });
        res.json({
            hash,
            message: '/share/' + hash,
        });
        return;
    }
    else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId,
        });
        res.json({
            message: 'Share link removed',
        });
    }
});
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const shareLink = req.params.shareLink;
    const link = await LinkModel.findOne({ hash: shareLink });
    if (!link) {
        return res.status(404).json({
            message: 'Share link not found',
        });
    }
    const content = await ContentModel.find({
        userId: link.userId
    });
    const user = await UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    res.json({
        content,
        user: user.username,
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map