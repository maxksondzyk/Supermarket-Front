import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import 'regenerator-runtime/runtime'

let myArr;
class CustomerCardsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            delay: 400
        }
        // this.automateRefresh = this.automateRefresh.bind(this);
    }
    // async automateRefresh() {
    //     while (true) {
    //         const { currentUser } = this.state;
    //         this.setState({ users: [] });
    //         myArr = userService.getData('customer-cards', currentUser)
    //         await sleep(this.state.delay);
    //     }
    // }

    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('customer-cards', currentUser)
        // this.automateRefresh()
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return userService.getRender('customer-cards',myArr,currentUser, "Customer cards");
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export { CustomerCardsPage };
