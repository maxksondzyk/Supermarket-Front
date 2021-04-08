import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import {Button} from "@material-ui/core";
import DataTable from "react-data-table-component";

let myArr;
class AddingPage extends React.Component {
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
        myArr = this.getData('categories', currentUser)
    }

    getData(req, currentUser){
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            myArr = JSON.parse(this.responseText);
        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
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
            // if(i === event.target.length-2)
            //     body = body.concat(`${event.target[i].id}=${event.target[i].value}`)
            // else
                body = body.concat(`,"${event.target[i].id}":"${event.target[i].value}"`)
        }
        body = body.concat(`}`)
        alert(body);
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {

        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
        })
        // open the request with the verb and the url
        xhr.open('POST', `http://localhost:8080/api/categories`,false)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
        // send the request
        xhr.send(body)
    }

    render() {
        let toRender = [];
        const { currentUser, userFromApi } = this.state;
        let keys = Object.keys(myArr[0]);
        return (
            <div>
                <form onSubmit={this.sendData}>
                {keys.map((item, index) => (
                    <div className="form-group">
                        <label htmlFor="inp">{item}</label>
                        <input type="inp" name="inp" required className="form-control" id={item}>
                        </input>
                    </div>))}
                    <button type="submit" className="btn btn-primary">Додати</button>
                </form>
            </div>);
    }
}

export { AddingPage };