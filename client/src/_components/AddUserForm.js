import React from 'react';

export const AddUserForm = (props) => {

    let user = {};

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        user = { ...user, [name]: value };
        // console.log(user);
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                if (!user.firstname || !user.lastname || !user.username || !user.password) return;

                props.addUser(user);
            }}
        >
            <label>Username</label>
            <input type="text" name="username" value={user.username} onChange={handleInputChange} /><br />
            <label>Password</label>
            <input type="text" name="password" value={user.password} onChange={handleInputChange} /><br />
            <label>Firstname</label>
            <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} /><br />
            <label>Lastname</label>
            <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} /><br />
            <button className="btn btn-success">Add</button>
            <button onClick={() => props.setAdding(false)} className="btn btn-danger">Cancel</button>
        </form>
    );
}