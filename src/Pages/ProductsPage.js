import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import 'regenerator-runtime/runtime'
import {csvService} from "../_services/csv.service";

let myArr;
class ProductsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            delay: 400
        }
    }

    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('products', currentUser);
    }

    render() {
        const { currentUser } = this.state;
        const data = userService.getRender('products',myArr,currentUser, "Products");
        return (<div>
            <div><button className="download-btn btn btn-success"  onClick={()=>{
            csvService.getCsv(myArr, 'products');
            }}> <strong>Download CSV</strong> <i class="fas fa-download"></i></button>
            </div>
            <div>{data}</div>
            </div>);
    }
}

export { ProductsPage };
