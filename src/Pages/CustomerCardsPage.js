import React from 'react';

import { userService } from '@/_services';
import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {Button} from "@material-ui/core";
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
        xhr.open('GET', 'http://localhost:8080/api/customer-cards',false)
        // send the request
        xhr.send()

    }

    render() {
        const { currentUser, userFromApi } = this.state;

        const columns = [
            {
                name: 'Card #',
                selector: 'cardNumber',
                sortable: true,
            },
            {
                name: 'Customer Surname',
                selector: 'customerSurname',
                sortable: true,
            },
            {
                name: 'Customer Name',
                selector: 'customerName',
                sortable: true,
            },
            {
                name: 'Customer Patronymic',
                selector: 'customerPatronymic',
                sortable: true,
            },
            {
                name: 'Phone Number',
                selector: 'phoneNumber',
                sortable: true,
            },
            {
                name: 'City',
                selector: 'city',
                sortable: true,
            },
            {
                name: 'Street',
                selector: 'street',
                sortable: true,
            },
            {
                name: 'Zip Code',
                selector: 'zipCode',
                sortable: true,
            },
            {
                name: 'Percent',
                selector: 'percent',
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
                    <DataTable title={"Customer Cards"} columns={columns} className="datatable" data={myArr} selectableRows highlightOnHover pagination/>
                </div>
            );
        }
        else return (
        <div>
            <DataTable title={"Customer Cards"} columns={columns} className="datatable" data={myArr} highlightOnHover pagination/>
        </div>
        );

    }
}
export { CustomerCardsPage };
