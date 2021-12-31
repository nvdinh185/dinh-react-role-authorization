const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/users.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    deleteById
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

// db.close();