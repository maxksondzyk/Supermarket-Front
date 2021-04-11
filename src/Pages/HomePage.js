import React from 'react';

import { authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }

    render() {

        const { currentUser } = this.state;
        return (
            <div class="welcomeHome">
                <h1>Welcome to Zlagoda Managing System.</h1>
                <p><strong>Role:</strong> <span class="badge bg-primary">{currentUser.roles}</span></p>
                <p><strong>Username:</strong> {currentUser.username}</p>
                <p><strong>Employee id:</strong> {currentUser.employeeId}</p>
                <p><strong>Description:</strong></p>
                <p>Manage your mini-market. Look through all Products, Categories, Checks, Sales etc.</p>
                <p>Use simple and parametrized queries for more functionality.</p>
            </div>
        );
    }
}
export { HomePage };
