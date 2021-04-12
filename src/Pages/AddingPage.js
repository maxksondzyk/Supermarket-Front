import React from 'react';

import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let myArr;

let checkTypes = ['number','number','number','date','number','number']
let employeeTypes = ['number','text','text','text','text','number','date','date','tel','text','text','number']
let productsTypes = ['number','number','text','text']
let storeProductsTypes = ['number','number','number','number','text']
let categoriesTypes = ['number', 'text']
let customerCardsTypes = ['number','text','text','text','tel','text','text','number','number']
let salesTypes = ['number','number','number','number']
let types;

class AddingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            req:null
        }
    }

    componentWillMount() {
        this.state.req = this.props.match.params.req
        const { currentUser } = this.state;
        myArr = this.getData(this.state.req, currentUser)

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
    }

    getData(req, currentUser){
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            myArr = JSON.parse(this.responseText);
        };
        // get a callback when the server responds
        // open the request with the verb and the url
        xhr.open('GET', `http://localhost:8080/api/${req}`,false)

        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
        // send the request
        xhr.send()
        return myArr;
    }

    sendData = event =>{
        const { currentUser} = this.state;
        let body = `{"${event.target[0].id}":"${event.target[0].value}"`;
        event.preventDefault()
        for(let i = 1;i<event.target.length-1;i++) {
            if(event.target[i].value)
                body = body.concat(`,"${event.target[i].id}":"${event.target[i].value}"`)
        }
        body = body.concat(`}`)
        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
                location.href = `/${this.props.match.params.req}`;
            } else if (xhr.readyState === XMLHttpRequest.DONE) {
                const errorMsg = JSON.parse(xhr.responseText)
                alert(errorMsg.message);
            }
        };

        // get a callback when the server responds
        // open the request with the verb and the url
        xhr.open('POST', `http://localhost:8080/api/${this.state.req}`,false)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
        // send the request
        xhr.send(body)
    }

    render() {
        // const { rowKeys, rowValues} = this.state;
        let rowKeys = Object.keys(myArr[0]);
        let toRender = [];
        for(let i = 0;i<rowKeys.length;i++){
            if(types[i] === 'number'){
                toRender.push(<div className="form-group">
                    <label htmlFor="inp">{rowKeys[i]}</label>
                    <input type={types[i]} step="0.01" name="inp" className="form-control" id={rowKeys[i]}>
                    </input>
                </div>);
            } else {
                toRender.push(<div className="form-group">
                    <label htmlFor="inp">{rowKeys[i]}</label>
                    <input type={types[i]} name="inp" className="form-control" id={rowKeys[i]}>
                    </input>
                </div>);
            }
        }
        return (
            <div>
                <form onSubmit={this.sendData}>
                    {toRender}
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>);
    }
}

export { AddingPage };
