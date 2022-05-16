import axiosClient from "../api/axiosClient";

export const userHandler = {
    deleteById,
    addNewUser,
    updateUser
};

async function deleteById(id) {
    try {
        const data = await axiosClient.post('/users/del', { id });
        return data;
    } catch (err) {
        throw new Error(`Có lỗi khi xóa! ${err}`);
    }
}

async function addNewUser(user) {
    try {
        const data = await axiosClient.post('/users/add', user);
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(`Có lỗi khi thêm! ${err}`);
    }
}

async function updateUser(user) {
    try {
        const data = await axiosClient.post('/users/update', user);
        return data;
    } catch (err) {
        throw new Error(`Có lỗi khi cập nhật! ${err}`);
    }
}