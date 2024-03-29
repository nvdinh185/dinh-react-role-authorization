import React from 'react';
import regeneratorRuntime from "regenerator-runtime";

import { v4 as uuidv4 } from 'uuid';

import { UserTable, AddUserForm, EditUserForm } from '@/_components';
import { authenticationService, userService, userHandler } from '@/_services';

class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentUser: {},
            isEdit: false,
            isAdd: false,
            status: ''
        };
    }

    componentDidMount() {
        userService.getAll()
            .then(users => this.setState({ users }))
            .catch(err => console.log("Lỗi: ", err));
    }

    deleteUser = async (id) => {
        if (authenticationService.currentUserValue.id != id) {
            try {
                await userHandler.deleteById(id);
                const newListUsers = this.state.users.filter((user) => user.id !== id);
                this.setState({ users: newListUsers });
            } catch (error) {
                console.log(`Lỗi: ${error}`);
            }
        }
    }

    callAddUser = () => {
        this.setState({ isAdd: true });
    }

    handleAddUser = async (user) => {
        user.id = uuidv4();
        user.role = 2;
        try {
            await userHandler.addNewUser(user);
            const newListUsers = [...this.state.users, user];
            this.setState({ users: newListUsers });
            this.setState({ isAdd: false });
        } catch (error) {
            // console.log(`Lỗi: ${error}`);
            this.setState({ status: `${error}` });
        }
    }

    setAdding = () => {
        this.setState({ isAdd: false });
        this.setState({ status: '' });
    }

    callUpdateUser = (user) => {
        this.setState({ isEdit: true });
        this.setState({ currentUser: user });
    }

    handleUpdateUser = async (updatedUser) => {
        try {
            await userHandler.updateUser(updatedUser);
            const newListUsers = this.state.users.map(user => (user.id === updatedUser.id ? updatedUser : user));
            this.setState({ users: newListUsers });
            this.setState({ isEdit: false });
        } catch (error) {
            console.log(`Lỗi: ${error}`);
        }
    }

    setEditing = () => {
        this.setState({ isEdit: false });
    }

    render() {
        const { users } = this.state;
        const { status } = this.state;
        return (
            <div>
                {this.state.isEdit ? (
                    <EditUserForm
                        setEditing={this.setEditing}
                        currentUser={this.state.currentUser}
                        updateUser={this.handleUpdateUser}
                    />
                ) : this.state.isAdd ? (
                    <div>
                        {status && <div className={'alert alert-danger'}>{status}</div>}

                        <AddUserForm setAdding={this.setAdding} addUser={this.handleAddUser} />
                    </div>
                ) : <button onClick={this.callAddUser} className="btn btn-primary">Add new user</button>
                }
                <h2>List users</h2>
                {users && <UserTable users={users} updateUser={this.callUpdateUser} deleteUser={this.deleteUser} />}
            </div>
        )
    }
}

export { UsersPage };