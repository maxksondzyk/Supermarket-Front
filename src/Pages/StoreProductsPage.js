import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let myArr = [];
class StoreProductsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }

    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('store-products', currentUser)
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        myArr.forEach(function (item,index){
            item.promotionalProduct = item.promotionalProduct.toString();
        })
        return userService.getRender(myArr,currentUser, "Products in Store");
    }
}
export { StoreProductsPage };
