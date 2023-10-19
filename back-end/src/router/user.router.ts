import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import { User, userModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt, { compare } from "bcryptjs"

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await userModel.countDocuments();
        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await userModel.create(sample_users);
        res.send("Seed is done!");
    }
))

router.post("/login-page", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        // const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.findOne({ email});
        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenRespone(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
        }

    }
))

router.post("/register-page", asyncHandler(
    async (req, res) => {

        const { name, email, password, address } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            // res.send(generateTokenRespone(user));
            res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            // _id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false,
        }

        const dbUser = await userModel.create(newUser);
        res.send(generateTokenRespone(dbUser));
    }
))

const generateTokenRespone = (user: any) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d",
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;