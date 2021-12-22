import React from 'react';
import regeneratorRuntime from "regenerator-runtime";

import { UserTable } from '@/_components';
import { authenticationService } from '@/_services';

import { userService } from '@/_services';
import { userHandler } from '@/_services';

class UsersPage extends React.Component {

    constructor(props) {
        super(props);

        // redirect to home if already logged in
        // if (authenticationService.currentUserValue) {
        //     this.props.history.push('/');
        // }
        // console.log(authenticationService.currentUserValue);
        this.state = {
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    // const [currentUser, setCurrentUser] = useState();
    // const [editing, setEditing] = useState(false);
    // const [adding, setAdding] = useState(false);

    // const addNewUser = () => {
    //     setAdding(true);
    // }

    // const addUser = async (user) => {
    //     user.id = uuidv4();
    //     await axios.post(urlServer + '/add-user', { user });
    //     setUsers([...users, user]);
    //     setAdding(false);
    // }

    deleteUser = async (id) => {
        if (authenticationService.currentUserValue.id != id) {
            try {
                await userHandler.deleteById(id);
                userService.getAll().then(users => this.setState({ users }));
            } catch (error) {
                console.log(`Lỗi: ${error}`);
            }
        }
    }

    // const updateUser = async (updatedUser) => {
    //     setEditing(false);
    //     await axios.post(urlServer + '/edit-user', { updatedUser });
    //     setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    // }

    // const editRow = (user) => {
    //     setEditing(true);
    //     setCurrentUser({ id: user.id, name: user.name, username: user.username });
    // }

    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h1>CRUD App with Hooks</h1>
                <div className="flex-row">
                    {/* <div className="flex-large">
                    {editing ? (
                        <>
                            <h2>Edit user</h2>
                            <EditUserForm
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </>
                    ) : adding ? (
                        <>
                            <h2>Add user</h2>
                            <AddUserForm setAdding={setAdding} addUser={addUser} />
                        </>
                    ) : <button onClick={addNewUser}>Add new user</button>}
                </div> */}
                    <div className="flex-large">
                        <h2>View users</h2>
                        {/* <UserTable users={users} editRow={editRow} deleteUser={deleteUser} /> */}
                        {users && <UserTable users={users} deleteUser={this.deleteUser} />}
                    </div>
                </div>
            </div>
        )
    }
}

export { UsersPage };