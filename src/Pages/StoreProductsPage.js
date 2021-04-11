import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import 'regenerator-runtime/runtime'

let myArr = [];
class StoreProductsPage extends React.Component {
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
    //         myArr = userService.getData('store-products', currentUser)
    //         await sleep(this.state.delay);
    //     }
    // }

    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('store-products', currentUser)
        // this.automateRefresh()
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        myArr.forEach(function (item,index){
            item.promotionalProduct = item.promotionalProduct.toString();
        })
        return userService.getRender('store-products',myArr,currentUser, "Products in Store");
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export { StoreProductsPage };
