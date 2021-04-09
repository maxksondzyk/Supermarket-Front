import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let myArr;
class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }

    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('categories', currentUser);
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return userService.getRender('categories',myArr,currentUser, "Categories");
    }
}
export { CategoriesPage };
