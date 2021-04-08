
import {Button} from "@material-ui/core";
import DataTable from "react-data-table-component";
import React from "react";
import {Link} from "react-router-dom";


export const userService = {
    getData,
    getRender
};

function getData(req, currentUser){
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


function getRender(myArr, currentUser, name){

    let keys = Object.keys(myArr[0]);
    const columns = []
    keys.forEach(function (item, index) {
        columns.push({name: item, selector: item, sortable: true})
    })
    if(currentUser.roles[0] === 'manager'){
        columns.push({
            cell: () => <Button variant={"outlined"} color="primary" size={"small"}>Edit</Button>,
            button: true,
        })
        return (
            <div>
                <DataTable
                    title={name}
                    columns={columns}
                    className="datatable"
                    data={myArr}
                    selectableRows
                    highlightOnHover
                    pagination
                    actions={<Link to="/add" className="btn btn-primary">Add</Link>}/>
            </div>
        );
    }
    else return (
        <div>
            <DataTable title={name} columns={columns} className="datatable" data={myArr} highlightOnHover pagination/>
        </div>
    );
}
