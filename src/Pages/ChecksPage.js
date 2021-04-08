import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let myArr;
class ChecksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }

    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('checks', currentUser)
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return userService.getRender(myArr,currentUser, "Checks");
    }
}
export { ChecksPage };
