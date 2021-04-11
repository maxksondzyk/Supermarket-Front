import React from 'react';

import { userService } from '@/_services';
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";
import 'regenerator-runtime/runtime'
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component";

let myArr;
let storeProductsTypes = ['upc','idProduct','sellingPrice','productNumber','promotionalProduct']
let prods = [];
let already = 0;
let sum = 0;


class NewCheckPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            prods: [],
            checkId: 0,
            cardNumber: 0
        }
    }
    componentWillMount() {
        const { currentUser } = this.state;
        myArr = userService.getData('store-products', currentUser)
    }

    addProduct(event, row){
        for(let i = 0;i<prods.length;i++){
            if(prods[i].upc === row["upc"]){
                already = 1;
                prods[i].quantity +=1;
                sum+=row["sellingPrice"]
                break;
            }

        }
        if(already === 0) {
            let upc = row["upc"];
            let idProduct = row["idProduct"];
            let sellingPrice = row["sellingPrice"];
            sum+=sellingPrice;
            prods.push({
                "upc": upc,
                "idProduct": idProduct,
                "sellingPrice": sellingPrice,
                "quantity": 1
            });
        }
        already = 0;
        this.setState({prods: prods})
    }

    printCheck(event){
        event.preventDefault();
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            location.href = '/checks'
        };

        // open the request with the verb and the url
        xhr.open('POST', `http://localhost:8080/api/checks`,false)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Authorization", `Bearer ${this.state.currentUser.token}`)
        // send the request

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        let body = {
            "checkNumber":`${this.state.checkId}`,
            "idEmployee":`${this.state.currentUser.employeeId}`,
            "cardNumber":`${this.state.cardNumber}`,
            "printDate":`${yyyy}-${mm}-${dd}`,
            "sumTotal": `${sum}`,
            "vat": `${(sum*0.2)/1.2}`
        }
        xhr.send(JSON.stringify(body))
    }
    addSales(event){
        event.preventDefault();
        for(let i = 0;i<prods.length;i++){
            let xhr = new XMLHttpRequest();
            // open the request with the verb and the url
            xhr.open('POST', `http://localhost:8080/api/sales`,false)
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.setRequestHeader("Authorization", `Bearer ${this.state.currentUser.token}`)

            let body = {
                "upc":`${prods[i].upc}`,
                "checkNumber": `${this.state.checkId}`,
                "productNumber": `${prods[i].quantity}`,
                "sellingPrice": `${prods[i].sellingPrice}`
            }
            xhr.send(JSON.stringify(body))
        }
    }
    removeProducts(event){
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (){

        }
        // open the request with the verb and the url
        xhr.open('PUT', `http://localhost:8080/api/store-products`,false)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Authorization", `Bearer ${this.state.currentUser.token}`)

        let body = {
            "upc":`${prods[i].upc}`,
            "checkNumber": `${this.state.checkId}`,
            "productNumber": `${prods[i].quantity}`,
            "sellingPrice": `${prods[i].sellingPrice}`
        }
        xhr.send(JSON.stringify(body))
    }
    delProduct(event, row){
        for(let i = 0;i<prods.length;i++){
            if(prods[i].upc === row["upc"]){
                if(prods[i].quantity>1) {
                    prods[i].quantity -= 1;
                    sum-=row["sellingPrice"]
                    break;
                }
                else {
                    prods.splice(i,i+1)
                    sum-=row["sellingPrice"]
                }

            }

        }
        this.setState({prods: prods})
    }

    onChange = (e) => {
        this.setState({ cardNumber: e.target.value });
    };
    onChangeID = (e) => {
        this.setState({ checkId: e.target.value });
    };

    render() {
        const { currentUser} = this.state;
        let req = 'store-products'
        let keys = Object.keys(myArr[0]);
        const columns = []
        keys.forEach(function (item, index) {
            columns.push({name: item, selector: item, sortable: true, minWidth:`${13*item.length}px`})
        })

        if(currentUser.roles[0] === 'manager' || req ==='checks' || req === 'customer-cards'){

            columns.unshift({
                cell: row => <button onClick={(event)=>this.addProduct(event,row)} className="btn btn-warning">Add</button>,
                button: true,
                compact: true
            })
            const cols = [
                {cell: row => <button onClick={(event)=>this.delProduct(event,row)} className="btn btn-warning">Delete</button>,
                 button: true,
                 compact: true},
                {name: "upc", selector: "upc"},
                {name: "idProduct", selector: "idProduct"},
                {name: "sellingPrice", selector: "sellingPrice"},
                {name: "quantity", selector: "quantity"}
            ]

            return (
                <div className={"datatable-cont"}>

                    <div className={"check"}>
                        <DataTable title="New Check" columns={cols} data={this.state.prods}/>
                    </div>
                    <form
                        className="form-group checkForm"
                        onSubmit={(event) => {
                            this.printCheck(event);
                            this.addSales(event);
                            this.removeProducts(event);
                        }}
                    >
                        <div className="row">
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cardNumber"
                                    aria-describedby="dataHelp"
                                    placeholder="Введіть cardNumber покупця"
                                    onChange={this.onChange}
                                />
                                <input
                                    type="number"
                                    className="form-control"
                                    id="checkId"
                                    aria-describedby="dataHelp"
                                    placeholder="Введіть id чека"
                                    onChange={this.onChangeID}
                                />
                                <button type="submit" className="btn btn-primary">
                                    Print
                                </button>
                            </div>
                        </div>
                    </form>

                    <DataTable
                        title={"Products"}
                        columns={columns}
                        className="datatable"
                        data={myArr}
                        highlightOnHover
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
}
export { NewCheckPage };
