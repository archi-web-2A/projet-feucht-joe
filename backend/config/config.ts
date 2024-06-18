import { Dialect } from 'sequelize';

require('dotenv').config();

interface IDbConfig {
    [key: string]: {
        username?: string;
        password?: string;
        database?: string;
        host?: string;
        dialect: Dialect;
        storage?: string;
    };
}

const config: IDbConfig = {
    development: {
        dialect: 'sqlite',
        storage: 'database.sqlite'
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
};

export default config;
