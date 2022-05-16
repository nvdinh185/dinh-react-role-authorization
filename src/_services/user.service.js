import axiosClient from "../api/axiosClient";

export const userService = {
    getAll,
    getUserById
};

async function getAll() {
    let users = await axiosClient.get('/users');
    // console.log(users);
    return users;
}

async function getUserById(id) {
    const userById = await axiosClient.get(`/users/${id}`);
    // console.log(userById);
    return userById;
}