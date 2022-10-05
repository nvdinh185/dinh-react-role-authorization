import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { UserTable } from '../_components/UserTable';
import { EditUserForm } from '../_components/EditUserForm';
import { AddUserForm } from '../_components/AddUserForm';

import { authenticationService } from '../_services/authentication.service';
import { userService } from '../_services/user.service';
import { userHandler } from '../_services/user.handler';

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
            const answer = window.confirm("Bạn có chắc muốn xóa không?");
            if (answer) {
                try {
                    await userHandler.deleteById(id);
                    const newListUsers = this.state.users.filter((user) => user.id !== id);
                    this.setState({ users: newListUsers });
                } catch (error) {
                    console.log(`Lỗi: ${error}`);
                }
            }
        } else {
            alert("Bạn không thể xóa chính mình!");
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
            this.setState({ isAdd: false, users: newListUsers });
        } catch (error) {
            // console.log(`Lỗi: ${error}`);
            this.setState({ status: `${error}` });
        }
    }

    setAdding = () => {
        this.setState({ isAdd: false, status: '' });
    }

    callUpdateUser = (user) => {
        this.setState({ isEdit: true, currentUser: user });
    }

    handleUpdateUser = async (updatedUser) => {
        try {
            await userHandler.updateUser(updatedUser);
            const newListUsers = this.state.users.map(user => (user.id === updatedUser.id ? updatedUser : user));
            this.setState({ isEdit: false, users: newListUsers });
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

export default UsersPage;