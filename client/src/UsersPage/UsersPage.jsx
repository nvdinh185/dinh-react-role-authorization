import React from 'react';
import regeneratorRuntime from "regenerator-runtime";

import { UserTable } from '@/_components';
import { authenticationService } from '@/_services';

import { userService } from '@/_services';
import { userHandler } from '@/_services';

class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null
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
                userService.getAll().then(users => this.setState({ users }));
            } catch (error) {
                console.log(`Lỗi: ${error}`);
            }
        }
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h2>List users</h2>
                {users && <UserTable users={users} deleteUser={this.deleteUser} />}
            </div>
        )
    }
}

export { UsersPage };