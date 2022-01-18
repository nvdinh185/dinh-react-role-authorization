const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/users.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    deleteById,
    addNewUser,
    updateUser
};

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

async function addNewUser(user) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)`,
            [user.id, user.username, user.password, user.firstname,
            user.lastname, user.role], function (err) {
                if (err) {
                    // console.error(`Lỗi ${err.message}`);
                    reject(new Error(err.message));
                }
                // console.log(`this.changes: ${this.changes}`);
                resolve(this.changes);
            });
    });
}

async function updateUser(user) {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE users SET username = ?, firstname = ?, lastname = ? WHERE id = ?`,
            [user.username, user.firstname, user.lastname, user.id], function (err) {
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