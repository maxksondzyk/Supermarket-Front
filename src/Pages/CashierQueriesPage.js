import React from 'react';

import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let results = []

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class CashierQueriesPage extends React.Component {

    state = {
        currentUser: authenticationService.currentUserValue,
        parameter: "",
        currUrl: "",
        lastName: "",
        date1: "",
        date2: ""

    }

    onChange = e => {
        this.setState({ parameter: e.target.value });
    };
    onChangeLastName = e => {
        this.setState({ lastName: e.target.value });
    };
    onChangeDate1 = e => {
        this.setState({ date1: e.target.value });
    };
    onChangeDate2 = e => {
        this.setState({ date2: e.target.value });
    };

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }
    automateRefresh() {
        this.setState({ users: [] });
        for(let i = 0;i<urls.length;i++){
            if(i === 0) {
                if(localStorage.getItem("lastName")){
                    this.getData(urls[i],{
                        "attribute":localStorage.getItem("lastName"),
                        "dateFrom":localStorage.getItem("date1"),
                        "dateTo":localStorage.getItem("date2")
                    })
                }
                else {
                    this.getData(urls[i], {
                        "attribute": "Romanova",
                        "dateFrom": "2019-04-10",
                        "dateTo": "2021-01-01"
                    });
                }
            }
            else
                this.getData(urls[i],{attribute:"0"})
        }

    }

    componentWillMount() {
        results = []

        for(let i = 0;i<urls.length;i++){
            if(i === 0) {
                if(localStorage.getItem("lastName")){
                    this.getData(urls[i],{
                        "attribute":localStorage.getItem("lastName"),
                        "dateFrom":localStorage.getItem("date1"),
                        "dateTo":localStorage.getItem("date2")
                    })
                }else {
                // if(this.state.lastName){
                //     this.getData(urls[i],{
                //                 "attribute":this.state.lastName,
                //                 "dateFrom":this.state.date1,
                //                 "dateTo":this.state.date2
                //             })
                // }
                // else{
                    this.getData(urls[i], {
                        "attribute": "Romanova",
                        "dateFrom": "2019-04-10",
                        "dateTo": "2021-01-01"
                    });
                }
            }
            else
                this.getData(urls[i],{attribute:"0"})
        }

    }


    getData(url, body) {
        // alert(url)
        const { currentUser } = this.state;
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(this.status === 500 || this.status === 204){
                results.push([{"Status":"No results"}])
            }else
            if(this.responseText) {
                // alert((this.responseText));
                results.push(JSON.parse(this.responseText));
                // alert((this.responseText)+"----"+(results[results.length-1])[0])
                //
            }
        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
        })

        // open the request with the verb and the url

        if(body.attribute !=="0"){
            xhr.open('POST', url,false)
            xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body))
        }
        else {
            xhr.open('GET', url,false)
            xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)
            xhr.send()
        }

    }
    handleSubmit(event, index) {
        event.preventDefault();
        results = [];
        urls[index] = `${urlsBase[index]}${this.state.parameter}`
        // titles[index] = `${titlesBase[index]}${this.state.parameter}`

        this.automateRefresh();
    }
    handleSubmit0(event, index) {
        localStorage.setItem("lastName","")
        localStorage.setItem("date1","")
        localStorage.setItem("date2","")
        event.preventDefault();
        results = [];
        // urls[index] = `${urlsBase[index]}${this.state.parameter}`
        // titles[index] = `${titlesBase[index]}${this.state.parameter}`
        localStorage.setItem("lastName", this.state.lastName)
        localStorage.setItem("date1", this.state.date1)
        localStorage.setItem("date2", this.state.date2)
        this.automateRefresh();
    }

    getDataTables = () => {
            return results.map((myArr1, index) => {
                // alert(myArr.value)
                let keys;
                let myArr = [];
                if (myArr1[0]) {
                    keys = Object.keys(myArr1[0]);
                    myArr = myArr1
                }
                else {
                    myArr.push(myArr1)
                    keys = Object.keys(myArr[0])
                }

                    const columns = []
                    keys.forEach(function (item) {
                        columns.push({name: item, selector: item, sortable: true, minWidth:`${13*item.length}px`})
                    })
                    if (index === parseInt(localStorage.getItem("currIndex"))) {
                        if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 || index === 10) {
                            return (
                                <div className={"collapse-div"}>
                                    <DataTable title={titles[index]} columns={columns}
                                               className="datatable" data={myArr} highlightOnHover pagination/>
                                    <form className="form-group" onSubmit={event => {
                                        this.handleSubmit(event, index)
                                    }}>
                                        <label htmlFor="inputData">Параметр</label>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="inputData"
                                                       aria-describedby="dataHelp"
                                                       placeholder="Введіть параметр"
                                                       onChange={this.onChange}/>
                                                <button type="submit" className="btn btn-primary">
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            );
                        } else if(index === 0){
                            return(
                                <div className={"collapse-div"}>
                                    <DataTable title={titles[index]} columns={columns}
                                               className="datatable" data={myArr} highlightOnHover pagination/>
                                    <form className="form-group" onSubmit={event => {
                                        this.handleSubmit0(event, index)
                                    }}>
                                        <label htmlFor="inputData">Прізвище</label>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" id="inputData"
                                                       aria-describedby="dataHelp"
                                                       placeholder="Введіть прізвище"
                                                       onChange={this.onChangeLastName}/>
                                                <label htmlFor="inputData2">Початкова дата</label>
                                                <input type="date" className="form-control" id="inputData2"
                                                       aria-describedby="dataHelp"
                                                       onChange={this.onChangeDate1}/>
                                                <label htmlFor="inputData3">Кінцева дата</label>
                                                <input type="date" className="form-control" id="inputData3"
                                                       aria-describedby="dataHelp"
                                                       onChange={this.onChangeDate2}/>
                                                <button type="submit" className="btn btn-primary">
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            );
                        }
                        else {
                            return (
                                <div>
                                    <DataTable title={titles[index]} columns={columns}
                                               className="datatable" data={myArr} highlightOnHover pagination/>
                                </div>
                            );
                        }
                    } else {
                        return (
                            <div>
                                <button className={"btn btn-collapse btn-secondary"} onClick={function (event) {
                                    event.preventDefault();
                                    localStorage.setItem("currIndex", index.toString());
                                    location.reload()
                                }}>{titles[index]}</button>
                            </div>
                        )
                    }

            })
    }

    render() {
        return(
            <div>
                {this.getDataTables()}
            </div>
        );
    }

}
export { CashierQueriesPage };


let titles = [
    "Скласти список чеків, видрукуваних даним касиром за певний період часу",
    "За номером чеку вивести всю інформацію про даний чек",
    "Вивести всю інформацію про покупця з певним прізвищем, що має карту клієнта",
    "За номером чека скласти список усіх товарів, інформація про продаж яких є у цьому чеку",
    "За ID_працівника знайти всю інформацію про себе",
    "Список усіх постійних клієнтів, що мають карту клієнта з певним відсотком",
    "Скласти список товарів, що належать певній категорії, відсортованих за назвою",
    "Скласти список усіх товарів, відсортований за назвою",
    "Скласти список усіх акційних товарів, відсортованих за кількістю одиниць товару/ за назвою",
    "Скласти список усіх не акційних товарів, відсортованих за кількістю одиниць товару/ за назвою",
    "За UPC-товару знайти ціну продажу товару, кількість наявних одиниць товару",

]

let urls = [
    'http://localhost:8080/api/cashier/checks-within-period',
    'http://localhost:8080/api/cashier/check-info/1',
    'http://localhost:8080/api/cashier/customer-card-info/Tokar',
    'http://localhost:8080/api/cashier/check-sale-info/1',
    'http://localhost:8080/api/cashier/employee-info/1',
    'http://localhost:8080/api/cashier/customers-with-discount/5',
    'http://localhost:8080/api/cashier/category-products-sorted/Snacks',
    'http://localhost:8080/api/cashier/all-products-sorted',
    'http://localhost:8080/api/cashier/promotional-products-sorted',
    'http://localhost:8080/api/cashier/not-promotional-products-sorted',
    'http://localhost:8080/api/cashier/not-promotional-products-sorted/36000291456'
]

//
let urlsBase = [
    'http://localhost:8080/api/cashier/checks-within-period',
    'http://localhost:8080/api/cashier/check-info/',
    'http://localhost:8080/api/cashier/customer-card-info/',
    'http://localhost:8080/api/cashier/check-sale-info/',
    'http://localhost:8080/api/cashier/employee-info/',
    'http://localhost:8080/api/cashier/customers-with-discount/',
    'http://localhost:8080/api/cashier/category-products-sorted/',
    'http://localhost:8080/api/cashier/all-products-sorted',
    'http://localhost:8080/api/cashier/promotional-products-sorted',
    'http://localhost:8080/api/cashier/not-promotional-products-sorted',
    'http://localhost:8080/api/cashier/not-promotional-products-sorted/'
]
