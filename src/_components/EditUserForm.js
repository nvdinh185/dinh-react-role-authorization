import React from 'react';
import { useEffect, useState } from 'react';

export const EditUserForm = (props) => {

  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props.currentUser]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!user.firstname || !user.lastname || !user.username) return;

        props.updateUser(user);
      }}
    >
      <label>Username</label>
      <input type="text" disabled value={user.username} /><br />
      <label>Firstname</label>
      <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} /><br />
      <label>Lastname</label>
      <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} /><br />
      <button className="btn btn-success">Update</button>
      <button onClick={() => props.setEditing()} className="btn btn-danger">
        Cancel
      </button>
    </form>
  )
}
