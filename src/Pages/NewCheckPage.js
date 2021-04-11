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


class NewCheckPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            prods: []
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
                break;
            }

        }
        if(already === 0) {
            let upc = row["upc"];
            let idProduct = row["idProduct"];
            let sellingPrice = row["sellingPrice"];
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
    printCheck(){

    }
    delProduct(event, row){
        for(let i = 0;i<prods.length;i++){
            if(prods[i].upc === row["upc"]){
                if(prods[i].quantity>1) {
                    prods[i].quantity -= 1;
                    break;
                }
                else {
                    prods.splice(i,i+1)
                }

            }

        }
        // if(already === 0) {
        //     let upc = row["upc"];
        //     let idProduct = row["idProduct"];
        //     let sellingPrice = row["sellingPrice"];
        //     prods.push({
        //         "upc": upc,
        //         "idProduct": idProduct,
        //         "sellingPrice": sellingPrice,
        //         "quantity": 1
        //     });
        // }
        // already = 0;
        this.setState({prods: prods})
    }

    render() {
        const { currentUser} = this.state;
        let req = 'store-products'
        let keys = Object.keys(myArr[0]);
        const columns = []
        keys.forEach(function (item, index) {
            columns.push({name: item, selector: item, sortable: true, minWidth:`${13*item.length}px`})
        })

        if(currentUser.roles[0] === 'manager' || req ==='checks' || req === 'customer-cards'){

            // columns.unshift({
            //     name: 'quantity',
            //     selector: 'quantity',
            //     button: true,
            //     compact: true
            // })
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
                        <DataTable columns={cols} data={this.state.prods}/>
                    </div>
                    <DataTable
                        title={name}
                        columns={columns}
                        className="datatable"
                        data={myArr}
                        highlightOnHover
                        actions={
                            <div>
                                <button className={"btn btn-primary"} onClick={(event)=>this.printCheck(event)}>Print</button>
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
}
export { NewCheckPage };
