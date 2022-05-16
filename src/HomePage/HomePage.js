import React from 'react';
import { userService } from '../_services/user.service';
import { authenticationService } from '../_services/authentication.service';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    async componentDidMount() {
        const { currentUser } = this.state;
        let userFromApi = await userService.getUserById(currentUser.id);
        this.setState({ userFromApi });
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1>Home</h1>
                <p>You're logged in with React & JWT!!</p>
                <p>Your role is: <strong>{currentUser.role}</strong>.</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div>
                    Current user from secure api end point:
                    {userFromApi &&
                        <ul>
                            <li>{userFromApi.firstname} {userFromApi.lastname}</li>
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export default HomePage;