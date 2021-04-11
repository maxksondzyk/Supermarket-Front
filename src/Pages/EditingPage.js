import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import {Button} from "@material-ui/core";
import DataTable from "react-data-table-component";
import {insert} from "formik";

let myArr;

let checkTypes = ['number','number','number','date','number','number']
let employeeTypes = ['number','text','text','text','text','number','date','date','tel','text','text','number']
let productsTypes = ['number','number','text','text']
let storeProductsTypes = ['number','number','number','number','text']
let categoriesTypes = ['number', 'text']
let customerCardsTypes = ['number','text','text','text','tel','text','text','number','number']
let salesTypes = ['number','number','number','number']

let types;

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

        if(this.state.req === 'checks'){
            types = checkTypes;
        }
        else if (this.state.req === 'employees'){
            types = employeeTypes
        }
        else if (this.state.req === 'products'){
            types = productsTypes
        }
        else if (this.state.req === 'store-products'){
            types = storeProductsTypes
        }
        else if (this.state.req === 'categories'){
            types = categoriesTypes
        }
        else if (this.state.req === 'customer-cards'){
            types = customerCardsTypes
        }
        else if (this.state.req === 'sales'){
            types = salesTypes
        }
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
        let toRender = [];
        for(let i = 0;i<rowKeys.length;i++){
                toRender.push(<div className="form-group">
                    <label htmlFor="inp">{rowKeys[i]}</label>
                    <input type={types[i]} name="inp" defaultValue={rowValues[i]} className="form-control" id={rowKeys[i]}>
                    </input>
                </div>);
        }
        return (
            <div>
                <form onSubmit={this.sendData}>
                    {toRender}
                    <button type="submit" className="btn btn-primary">Edit</button>
                </form>
            </div>);
    }
}

export { EditingPage };
