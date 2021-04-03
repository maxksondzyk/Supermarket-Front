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

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }

    render() {
        const columns = [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Director',
                selector: 'director',
                sortable: true,
            },
            {
                name: 'Year',
                selector: 'year',
                sortable: true,
            },
        ]
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
                        <li>{userFromApi.firstName} {userFromApi.lastName}</li>
                    </ul>
                    }
                </div>
                <DataTable columns={columns} data={[["1","2"],["3","4"]]}/>
            </div>
        );
    }
}
export { HomePage };
