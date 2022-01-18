import React from 'react';

export const UserTable = (props) => {
    const myHeader = {
        width: "200px",
        border: "1px solid black"
    }
    const myBody = {
        border: "1px solid violet"
    }
    return (
        <table>
            <thead>
                <tr>
                    <th style={myHeader}>Username</th>
                    <th style={myHeader}>Firstname</th>
                    <th style={myHeader}>Lastname</th>
                    <th style={myHeader}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.users.length > 0 ? (
                    props.users.map((user) => (
                        <tr key={user.id}>
                            <td style={myBody}>{user.username}</td>
                            <td style={myBody}>{user.firstname}</td>
                            <td style={myBody}>{user.lastname}</td>
                            <td style={myBody}>
                                <button onClick={() => props.updateUser(user)} className="btn btn-primary">Edit</button>
                                <button onClick={() => props.deleteUser(user.id)} className="btn btn-danger">Delete</button>
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
    );
}