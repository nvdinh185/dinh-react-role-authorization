// const config = require('config.json');
// const jwt = require('jsonwebtoken');
// const Role = require('_helpers/role');
// const { v4: uuidv4 } = require('uuid');

const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/users.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    deleteById
};

// async function signup({ username, password, firstname, lastname }) {
//     const user = { id: uuidv4(), username, password, firstname, lastname, role: Role.User };
//     // users.push(user);
//     return { username, firstname, lastname, role: Role.User };
// }

// async function login({ username, password }) {
//     const user = await new Promise((resolve, reject) => {
//         db.each(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, row) => {
//             if (err) reject(err);
//             resolve(row);
//         })
//     })
//     // console.log(user);
//     if (user) {
//         const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
//         const { password, ...userWithoutPassword } = user;
//         return {
//             ...userWithoutPassword,
//             token
//         };
//     } else {
//         throw new Error("Cannot find user!");
//     }
// }

// async function getAll() {
//     const users = await new Promise((resolve, reject) => {
//         db.all(`SELECT * FROM users`, (err, row) => {
//             if (err) reject(err);
//             resolve(row);
//         })
//     })
//     return users.map(u => {
//         const { password, ...userWithoutPassword } = u;
//         return userWithoutPassword;
//     });
// }

async function deleteById({ id }) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
            if (err) {
                // console.error(`Lỗi ${err.message}`);
                reject(new Error(err.message));
            }
            // console.log(`this.changes: ${this.changes}`);
            resolve(this.changes);
        });
    });
}

// db.close();