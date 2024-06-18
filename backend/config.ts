import dotenv from 'dotenv';

dotenv.config();

export const BDD = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '',
    bdname: process.env.DB_NAME || '',
};
