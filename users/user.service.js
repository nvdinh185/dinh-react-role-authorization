const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const { v4: uuidv4 } = require('uuid');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstname: 'Admin', lastname: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstname: 'Normal', lastname: 'User', role: Role.User }
];

module.exports = {
    signup,
    login,
    getAll,
    getById
};

async function signup({ username, password, firstname, lastname }) {
    const user = { id: uuidv4(), username, password, firstname, lastname, role: Role.User };
    users.push(user);
    return { username, firstname, lastname, role: Role.User };
}

async function login({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    } else {
        throw new Error("Cannot find user!");
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}