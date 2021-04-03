import React from 'react';

import { userService } from '@/_services';
import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {Button} from "@material-ui/core";
import {authenticationService} from "../_services";

let myArr;
class EmployeesPage extends React.Component {
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
        xhr.open('GET', 'http://localhost:8080/api/employees',false)
        // send the request
        xhr.send()

    }

    render() {

        const { currentUser, userFromApi } = this.state;

        const columns = [
            {
                name: 'Id',
                selector: 'idEmployee',
                sortable: true,
            },
            {
                name: 'Surname',
                selector: 'employeeSurname',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'employeeName',
                sortable: true,
            },
            {
                name: 'Patronymic',
                selector: 'employeePatronymic',
                sortable: true,
            },
            {
                name: 'Role',
                selector: 'role',
                sortable: true,
            },
            {
                name: 'Salary',
                selector: 'salary',
                sortable: true,
            },
            {
                name: 'Date of birth',
                selector: 'birthDate',
                sortable: true,
            },
            {
                name: 'Date of start',
                selector: 'startDate',
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
export { EmployeesPage };
