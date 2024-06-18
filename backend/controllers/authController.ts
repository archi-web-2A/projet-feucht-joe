import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../models';
import dotenv from 'dotenv';
import * as util from "util";

dotenv.config();

const Utilisateurs = db.users;
const { Op } = db.Sequelize;

// Generate access token
const generateAccessToken = (user: any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1800s' });
};

// Login function
export const login = async (req: Request, res: Response) => {
    const utilisateur = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        const data = await Utilisateurs.findOne({ where: { email: utilisateur.email } });
        if (data) {
            const user = {
                email: data.email,
                password: data.password
            };

            const accessToken = generateAccessToken(user);
            res.setHeader('Authorization', `Bearer ${accessToken}`);
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Utilisateur with login=${utilisateur.email}.`
            });
        }
    } catch (err) {
        res.status(400).send({
            message: `Error retrieving Utilisateur with login=${utilisateur.email}`
        });
    }
};

// Register function (if needed)
export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phoneNumber, gender, birthDate, location, city, postalCode, password } = req.body;
    const user = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        birthDate,
        location,
        city,
        postalCode,
        password
    };

    try {
        const existingUser = await Utilisateurs.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).send({ message: 'User already exists' });
            return;
        }

        await Utilisateurs.create(user);
        const accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.send({ accessToken });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await Utilisateurs.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).send({
            message: 'Error retrieving users'
        });
    }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err, user) => {
            if (err) return res.sendStatus(403);

            const currentUser = await Utilisateurs.findByPk((user as any).id);
            if (currentUser) {
                res.json(currentUser);
            } else {
                res.status(404).send({ error: 'User not found' });
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'Error retrieving current user'
        });
    }
};
