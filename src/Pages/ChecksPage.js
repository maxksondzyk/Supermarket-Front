import React from 'react';

import { userService } from '@/_services';
import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {Button} from "@material-ui/core";
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
        xhr.open('GET', 'http://localhost:8080/api/checks',false)
        // send the request
        xhr.send()

    }

    render() {
        const { currentUser, userFromApi } = this.state;

        const columns = [
            {
                name: 'Check #',
                selector: 'checkNumber',
                sortable: true,
            },
            {
                name: 'Employee Id',
                selector: 'idEmployee',
                sortable: true,
            },
            {
                name: 'Card Number',
                selector: 'cardNumber',
                sortable: true,
            },
            {
                name: 'Print Date',
                selector: 'printDate',
                sortable: true,
            },
            {
                name: 'Total Sum',
                selector: 'sumTotal',
                sortable: true,
            },
            {
                name: 'Vat',
                selector: 'vat',
                sortable: true,
            },
            {
                cell: () => <Button variant={"outlined"} color="primary" size={"small"}>Edit</Button>,
                button: true,
            }

        ]
        if(currentUser.role === 'Manager'){
            return (
                <div>
                    <DataTable title={"Checks"} columns={columns} className="datatable" data={myArr} selectableRows highlightOnHover pagination/>
                </div>
            );
        }
        else return (
        <div>
            <DataTable title={"Checks"} columns={columns} className="datatable" data={myArr} highlightOnHover pagination/>
        </div>
        );

    }
}
export { ChecksPage };
