import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../models';
import dotenv from 'dotenv';

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
        login: req.body.login,
        password: req.body.password
    };

    // Validate login and password
    const pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
        try {
            const data = await Utilisateurs.findOne({ where: { login: utilisateur.login } });
            if (data) {
                const user = {
                    id: data.id,
                    name: data.nom,
                    email: data.email
                };

                const accessToken = generateAccessToken(user);
                res.setHeader('Authorization', `Bearer ${accessToken}`);
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Utilisateur with login=${utilisateur.login}.`
                });
            }
        } catch (err) {
            res.status(400).send({
                message: `Error retrieving Utilisateur with login=${utilisateur.login}`
            });
        }
    } else {
        res.status(400).send({
            message: 'Login or password incorrect'
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
            res.status(409).send({ error: 'User already exists' });
            return;
        }

        await Utilisateurs.create(user);
        const accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.send({ accessToken });
    } catch (err) {
        res.status(400).send({
            message: 'Error creating new user'
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
