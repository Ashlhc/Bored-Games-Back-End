const Sequelize = require('sequelize');
const mysql = require('mysql2');
require('dotenv').config();

const { JAWSDB_URL, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

let sequelize;

if (JAWSDB_URL) {
    sequelize = new Sequelize(JAWSDB_URL);
} else {
    const db = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
    });

    db.connect();
    db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, () => {
        db.destroy();
    });


    sequelize = new Sequelize(
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
        {
            host: DB_HOST,
            dialect: 'mysql',
            port: 3306,
        },
    );
};

module.exports = sequelize;

