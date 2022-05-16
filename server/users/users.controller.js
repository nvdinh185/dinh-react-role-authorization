const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const userHandler = require('./user.handler');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

// routes
router.post('/login', login);     // public route
router.post('/signup', signup);     // public route
router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/:id', authorize(), getUserById);       // all logined users

router.post('/del', authorize(Role.Admin), deleteById);       // admin only
router.post('/add', authorize(Role.Admin), addNewUser);       // admin only
router.post('/update', authorize(Role.Admin), updateUser);       // admin only
module.exports = router;

function signup(req, res, next) {
    userService.signup(req.body)
        .then(lastID => res.json(lastID))
        .catch(err => next(err));
}

function login(req, res, next) {
    userService.login(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getUserById(req, res, next) {
    const currentUser = req.user;
    const id = req.params.id;

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getUserById(id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteById(req, res, next) {
    userHandler.deleteById(req.body)
        .then(results => {
            // console.log("results: ", results);
            res.json(results);
        })
        .catch(err => {
            // console.log("err: ", err);
            next(err);
        });
}

function addNewUser(req, res, next) {
    userHandler.addNewUser(req.body)
        .then(results => {
            // console.log("results: ", results);
            res.json(results);
        })
        .catch(err => {
            // console.log("err: ", err);
            next(err);
        });
}

function updateUser(req, res, next) {
    userHandler.updateUser(req.body)
        .then(results => {
            // console.log("results: ", results);
            res.json(results);
        })
        .catch(err => {
            // console.log("err: ", err);
            next(err);
        });
}