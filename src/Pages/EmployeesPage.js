import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import 'regenerator-runtime/runtime'
import {csvService} from "../_services/csv.service";

let myArr;
class EmployeesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            delay: 400
        }
    }

    componentWillMount() {
        const {currentUser} = this.state;
        myArr = userService.getData('employees', currentUser)
    }

    render() {
        const {currentUser} = this.state;
        const data = userService.getRender('employees',myArr,currentUser, "Employees");
        return (<div>
            <div><button className="download-btn btn btn-success"  onClick={()=>{
            csvService.getCsv(myArr, 'employees');
            }}> <strong>Download CSV</strong> <i class="fas fa-download"></i></button>
            </div>
            <div>{data}</div>
            </div>);
    }
}

export { EmployeesPage };
