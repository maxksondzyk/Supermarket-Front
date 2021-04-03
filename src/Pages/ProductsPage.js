import React from 'react';

import { userService } from '@/_services';
import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {Button} from "@material-ui/core";
import {authenticationService} from "../_services";

let myArr;
class ProductsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }

    componentWillMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
        this.getData()

    }


    getData() {
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            myArr = JSON.parse(this.responseText);
        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log(xhr.responseText)
        })
        // open the request with the verb and the url
        xhr.open('GET', 'http://localhost:8080/api/products',false)
        // send the request
        xhr.send()

    }

    render() {
        const { currentUser, userFromApi } = this.state;

        const columns = [
            {
                name: 'Id',
                selector: 'idProduct',
                sortable: true,
            },
            {
                name: 'Category #',
                selector: 'categoryNumber',
                sortable: true,
            },
            {
                name: 'Product Name',
                selector: 'productName',
                sortable: true,
            },
            {
                name: 'Characteristics',
                selector: 'characteristics',
                sortable: true,
            },

        ]
        if(currentUser.role === 'Manager'){
            columns.push({
                cell: () => <Button variant={"outlined"} color="primary" size={"small"}>Edit</Button>,
                button: true,
            })
            return (
                <div>
                    <DataTable title={"Products"} columns={columns} className="datatable" data={myArr} selectableRows highlightOnHover pagination/>
                </div>
            );
        }
        else return (
        <div>
            <DataTable title={"Products"} columns={columns} className="datatable" data={myArr} highlightOnHover pagination/>
        </div>
        );

    }
}
export { ProductsPage };
