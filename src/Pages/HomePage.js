import React from 'react';

import { userService, authenticationService } from '@/_services';

import DataTable from "react-data-table-component";
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    render() {

        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1>Home</h1>
                <p>Your role is: <strong>{currentUser.roles}</strong>.</p>
                <p>Username: {currentUser.username}</p>
                <p>Id: {currentUser.employeeId}</p>
            </div>
        );
    }
}
export { HomePage };
