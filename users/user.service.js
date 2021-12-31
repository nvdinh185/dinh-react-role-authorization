const config = require('config.json');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/users.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    signup,
    login,
    getAll,
    getById
};

async function signup({ username, password, firstname, lastname }) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users(id, username, password, firstname, lastname, role) VALUES(?, ?, ?, ?, ?, ?)`,
            [uuidv4(), username, password, firstname, lastname, 2], function (err) {
                if (err) reject(new Error(`Lỗi: ${err.message}`));
                resolve(this.lastID);
            })
    })
}

async function login({ username, password }) {
    try {
        const user = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        // console.log(user);
        if (user && user[0]) {
            const token = jwt.sign({ sub: user[0].id, role: user[0].role }, config.secret);
            const { password, ...userWithoutPassword } = user[0];
            return {
                ...userWithoutPassword,
                token
            };
        } else {
            throw new Error("Cannot find user!");
        }

    } catch (error) {
        throw new Error(error);
    }
}

async function getAll() {
    const users = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = await new Promise((resolve, reject) => {
        db.each(`SELECT * FROM users WHERE id = '${id}'`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// db.close();