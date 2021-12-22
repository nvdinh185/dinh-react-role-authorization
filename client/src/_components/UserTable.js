import React from 'react';

export const UserTable = (props) => (
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.users.length > 0 ? (
                props.users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>
                            <button
                                onClick={() => props.editRow(user)}
                                className="button muted-button"
                            >Edit</button>
                            <button
                                onClick={() => props.deleteUser(user.id)}
                                className="button muted-button"
                            >Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No users</td>
                </tr>
            )}
        </tbody>
    </table>
)