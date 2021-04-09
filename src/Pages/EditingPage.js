import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import {Button} from "@material-ui/core";
import DataTable from "react-data-table-component";
import {insert} from "formik";

let myArr;
class EditingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            req:null,
            rowValues:[],
            rowKeys:[]
        }
    }

    componentWillMount() {
        let row = this.props.location.param1
        let rowValues = [];
        let rowKeys = [];
        for(let key in row) {
            if(row.hasOwnProperty(key)) {
                let value = row[key];
                rowValues.push(value)
                rowKeys.push(key)
            }
        }
        this.state.req = this.props.match.params.req
        this.state.rowKeys = rowKeys
        this.state.rowValues = rowValues

    // const history = useHistory();

     // history.push("/add/categories");
    // parent.location.href = `add/${page}/${values[0]}`;

        const { currentUser } = this.state;
        myArr = this.getData(this.state.req, currentUser)
    }

    getData(req, currentUser){
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            myArr = JSON.parse(this.responseText);
        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
        })
        // open the request with the verb and the url
        xhr.open('GET', `http://localhost:8080/api/${req}`,false)

        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
        // send the request
        xhr.send()
        return myArr;
    }
    sendData = event =>{
        const { currentUser, userFromApi } = this.state;
        let body = `{"${event.target[0].id}":"${event.target[0].value}"`;
        event.preventDefault()
        for(let i = 1;i<event.target.length-1;i++) {
            if(event.target[i].value)
                body = body.concat(`,"${event.target[i].id}":"${event.target[i].value}"`)
        }
        body = body.concat(`}`)
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {

        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            location.href = `/${this.state.req}`;
        })
        // open the request with the verb and the url
        xhr.open('PUT', `http://localhost:8080/api/${this.state.req}/${event.target[0].value}`,false)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
        // send the request
        xhr.send(body)
    }

    render() {
        const { rowKeys, rowValues} = this.state;

        return (
            <div>
                <form onSubmit={this.sendData}>
                    {rowKeys.map((item, index) => (
                        <div className="form-group">
                            <label htmlFor="inp">{item}</label>
                            <input type="inp" name="inp" defaultValue={rowValues[index]} className="form-control" id={item}>
                            </input>
                        </div>))}
                    <button type="submit" className="btn btn-primary">Редагувати</button>
                </form>
            </div>);
    }
}

export { EditingPage };
