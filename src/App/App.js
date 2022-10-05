import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '../_helpers/history';
import { Role } from '../_helpers/role';
import { authenticationService } from '../_services/authentication.service';
import { PrivateRoute } from '../_components/PrivateRoute';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import UsersPage from '../UsersPage/UsersPage';
import AdminPage from '../AdminPage/AdminPage';
import LoginPage from '../LoginPage/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                {isAdmin && <Link to="/users" className="nav-item nav-link">Users</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <Route path="/signup" component={SignupPage} />
                                    <Route path="/login" component={LoginPage} />
                                    <PrivateRoute path="/users" roles={[Role.Admin]} component={UsersPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;