import React from 'react';

import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let myArr;
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
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            location.href = `/${this.state.req}`;
        })
        // open the request with the verb and the url
        xhr.open('POST', `http://localhost:8080/api/${this.state.req}`,false)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
        // send the request
        xhr.send(body)
    }

    render() {
        let keys = Object.keys(myArr[0]);
        return (
            <div>
                <form onSubmit={this.sendData}>
                {keys.map((item, index) => (
                    <div className="form-group">
                        <label htmlFor="inp">{item}</label>
                        <input type="inp" name="inp" className="form-control" id={item}>
                        </input>
                    </div>))}
                    <button type="submit" className="btn btn-primary">Додати</button>
                </form>
            </div>);
    }
}

export { AddingPage };
