import DataTable from "react-data-table-component";
import React from "react";
import {Link} from "react-router-dom";
import 'react-data-table-component-extensions/dist/index.css';

export const userService = {
    getData,
    getRender
};

let page = '';
let currentUser;

function getData(req, currentUser1){
    currentUser = currentUser1
    let myArr = [];
    // create a new XMLHttpRequest
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if(this.responseText)
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

function deleteRows(event,row){
    event.preventDefault();
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {

        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {

        })
        let id = 0;
        for (let key in row) {
            if (row.hasOwnProperty(key)) {
                id = row[key];
                break;
            }
        }
        // open the request with the verb and the url
        xhr.open('DELETE', `http://localhost:8080/api/${page}/${id}`, false)

        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
        // send the request
        xhr.send()
        getData(page, currentUser)
    location.reload()
}



function getRender(req,myArr, currentUser, name){

    page = req;
    let keys = Object.keys(myArr[0]);
    const columns = []
    keys.forEach(function (item, index) {
        columns.push({name: item, selector: item, sortable: true, minWidth:`${13*item.length}px`})
    })

    if(currentUser.roles[0] === 'manager' || req ==='checks' || req === 'customer-cards'){
        function newTo(row){
            return({
                    pathname: '/edit/' + req,
                    param1: row
                }
            )
        }

        columns.unshift({
            cell: row => <Link to={newTo(row)} variant={"outlined"} color="primary" size={"small"} className="btn btn-warning">Edit</Link>,
            button: true,
            compact: true
        })
        if(currentUser.roles[0] === 'manager') {
            columns.unshift({
                cell: row => <button onClick={function (event) {
                    deleteRows(event, row)
                }} className="btn btn-danger">Delete</button>,
                button: true,
                compact: true,
            })
        }

        return (
            <div className={"datatable-cont"}>
                <DataTable
                    title={name}
                    columns={columns}
                    className="datatable"
                    data={myArr}
                    highlightOnHover
                    actions={
                        <div>
                        <Link to={'/add/'+req} params={{ "page": req }} className="btn btn-primary">Add</Link>
                            <button className={"btn btn-primary"} onClick={window.print}>Print</button>
                        </div>
                    }
                />
            </div>
        );
    }
    else return (
        <div>
            <DataTable title={name} columns={columns} className="datatable" data={myArr} highlightOnHover actions={<button className={"btn btn-primary"} onClick={window.print}>Print</button>}/>
        </div>
    );
}
