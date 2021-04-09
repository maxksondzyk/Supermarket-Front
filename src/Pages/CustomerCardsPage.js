import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let myArr;
class CustomerCardsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }

    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('customer-cards', currentUser)
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return userService.getRender('customer-cards',myArr,currentUser, "Customer cards");
    }
}
export { CustomerCardsPage };
