import { Sequelize } from 'sequelize';
import { BDD } from '../config';
import { UserFactory } from './utilisateurs.model';

const sequelize = new Sequelize(`postgres://${BDD.user}:${BDD.password}@${BDD.host}/${BDD.bdname}`, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native: true,
    },
    define: {
        timestamps: false,
    },
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = UserFactory(sequelize);

export default db;
