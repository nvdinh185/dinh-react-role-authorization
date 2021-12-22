import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userHandler = {
    deleteById
};

function deleteById(id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify({ id })
    };
    // console.log(requestOptions);

    return fetch(`${config.apiUrl}/users/del`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log("data: ", data);

            return data;
        })
        .catch(err => {
            // console.log("err: ", err);
            throw new Error(`Có lỗi khi xóa! ${err}`);
        });
}