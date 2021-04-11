import React from 'react';

import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let results = []

class ManagerQueriesPage extends React.Component {

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

        this.prepareData()
    }

    prepareData(){
        for(let i = 0;i<urls.length;i++){
            if(i === 5 || i === 7) {
                if(localStorage.getItem("lastName")){
                    this.getData(urls[i],{
                        "attribute":localStorage.getItem("lastName"),
                        "dateFrom":localStorage.getItem("date1"),
                        "dateTo":localStorage.getItem("date2")
                    })
                }
                else {
                    this.getData(urls[i], {
                        attribute: "Romanova",
                        dateFrom: "2019-04-10",
                        dateTo: "2021-01-01"
                    });
                }
            }
            else if(i === 6 || i === 8) {
                if(localStorage.getItem("date1")){
                    this.getData(urls[i],{
                        "dateFrom":localStorage.getItem("date1"),
                        "dateTo":localStorage.getItem("date2")
                    })
                }
                else {
                    this.getData(urls[i], {
                        dateFrom: "2019-04-10",
                        dateTo: "2021-01-01"
                    });
                }
            }
            else if(i === 9) {
                if(localStorage.getItem("lastName")){
                    this.getData(urls[i],{
                        "attribute":localStorage.getItem("lastName"),
                        "dateFrom":localStorage.getItem("date1"),
                        "dateTo":localStorage.getItem("date2")
                    })
                }else {
                    this.getData(urls[i], {
                        attribute: "Apples",
                        dateFrom: "2019-04-10",
                        dateTo: "2021-01-01"
                    });
                }
            }
            else {
                this.getData(urls[i], {attribute:"0"})
            }
        }
    }

    componentWillMount() {
        results = []

        this.prepareData()

    }


    getData(url,body) {
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


    getDataTables = () =>{
        return results.map((myArr1,index) => {

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
            if(index === parseInt(localStorage.getItem("currIndex"))) {
                if (index === 1 || index === 3 || index === 4 || index === 11 || index === 12 || index === 13 || index === 17) {
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
                }  else if(index === 5 || index === 7 || index === 9){
                    return(
                        <div className={"collapse-div"}>
                            <DataTable title={titles[index]} columns={columns}
                                       className="datatable" data={myArr} highlightOnHover pagination/>
                            <form className="form-group" onSubmit={event => {
                                this.handleSubmit0(event, index)
                            }}>
                                <label htmlFor="inputData">Атрибут</label>
                                <div className="row">
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" id="inputData"
                                               aria-describedby="dataHelp"
                                               placeholder="Введіть атрибут"
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
                } else if(index === 6 || index === 8){
                    return(
                        <div className={"collapse-div"}>
                            <DataTable title={titles[index]} columns={columns}
                                       className="datatable" data={myArr} highlightOnHover pagination/>
                            <form className="form-group" onSubmit={event => {
                                this.handleSubmit0(event, index)
                            }}>
                                <div className="row">
                                    <div className="col-md-3">
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
                }else {
                    return (
                        <div>
                            <DataTable title={titles[index]} columns={columns}
                                       className="datatable" data={myArr} highlightOnHover pagination/>
                        </div>
                    );
                }
            }else{
                return (
                    <div>
                        <button className={"btn btn-collapse btn-secondary"} onClick={function(event){event.preventDefault(); localStorage.setItem("currIndex",index.toString()); location.reload() }}>{titles[index]}</button>
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

export { ManagerQueriesPage };


let titles = [
    "Скласти список працівників, що займають посаду касира, відсортованих за прізвищем",
    "За прізвищем працівника знайти його телефон та адресу",
    "Скласти список усіх категорій, відсортованих за назвою",
    "Скласти список всіх товарів, що належать певній категорії",
    "Скласти список товарів у магазині, що належать певному товару",
    "Скласти список чеків, видрукуваних певним касиром за певний період часу (з можливістю перегляду куплених товарів, їх к-сті та ціни)",
    "Скласти список чеків, видрукуваних усіма касирами за певний період часу (з можливістю перегляду куплених товарів, їх к-сті та ціни )",
    "Загальна сума проданих товарів з чеків, видрукуваних певним касиром за певний період часу",
    "Загальна сума проданих товарів з чеків, видрукуваних усіма касироми за певний період часу",
    "Визначити загальну кількість одиниць певного товару, проданого за певний період часу",
    "Скласти список усіх постійних клієнтів, що мають карту клієнта, по полях  ПІБ, телефон, адреса (якщо вказана)",
    "За UPC-товару знайти ціну продажу товару, кількість наявних одиниць товару, назву та характеристики товару",
    "Список усіх постійних клієнтів, що мають карту клієнта з певним відсотком",
    "Cкласти список товарів, що належать певній категорії, відсортованих за назвою",
    "Скласти список усіх товарів, відсортований за назвою",
    "Скласти список усіх акційних товарів, відсортованих за кількістю одиниць товару/ за назвою",
    "Скласти список усіх не акційних товарів, відсортованих за кількістю одиниць товару/ за назвою",
    "За UPC-товару знайти ціну продажу товару, кількість наявних одиниць товару"
]

let urls = [
    'http://localhost:8080/api/manager/cashiers-sorted',
    'http://localhost:8080/api/manager/employee-contacts/Romanova',
    'http://localhost:8080/api/manager/categories-sorted',
    'http://localhost:8080/api/manager/category-products-sorted/Snacks',
    'http://localhost:8080/api/manager/store-products/Apples',
    'http://localhost:8080/api/manager/cashier-checks-within-period',
    'http://localhost:8080/api/manager/all-cashier-checks-within-period',
    'http://localhost:8080/api/manager/total-cashier-check-sum-within-period',
    'http://localhost:8080/api/manager/total-check-sum-within-period',
    'http://localhost:8080/api/manager/total-sold-product',
    'http://localhost:8080/api/manager/all-customer-cards',
    'http://localhost:8080/api/manager/product-info/36000291452',

    'http://localhost:8080/api/manager/customers-with-discount/5',
    'http://localhost:8080/api/manager/category-products-sorted/Beverages',
    'http://localhost:8080/api/manager/all-products-sorted',
    'http://localhost:8080/api/manager/promotional-products-sorted',
    'http://localhost:8080/api/manager/not-promotional-products-sorted',
    'http://localhost:8080/api/manager/product-price-quantity/36000291452',
]


let urlsBase = [
    'http://localhost:8080/api/manager/cashiers-sorted', //0
    'http://localhost:8080/api/manager/employee-contacts/', //1
    'http://localhost:8080/api/manager/categories-sorted', //2
    'http://localhost:8080/api/manager/category-products-sorted/', //3
    'http://localhost:8080/api/manager/store-products/', //4
    'http://localhost:8080/api/manager/cashier-checks-within-period', //5
    'http://localhost:8080/api/manager/all-cashier-checks-within-period', //6
    'http://localhost:8080/api/manager/total-cashier-check-sum-within-period', //7
    'http://localhost:8080/api/manager/total-check-sum-within-period', //8
    'http://localhost:8080/api/manager/total-sold-product', //9
    'http://localhost:8080/api/manager/all-customer-cards', //10
    'http://localhost:8080/api/manager/product-info/', //11
    'http://localhost:8080/api/manager/customers-with-discount/', //12
    'http://localhost:8080/api/manager/category-products-sorted/', //13
    'http://localhost:8080/api/manager/all-products-sorted', //14
    'http://localhost:8080/api/manager/promotional-products-sorted', //15
    'http://localhost:8080/api/manager/not-promotional-products-sorted', //16
    'http://localhost:8080/api/manager/product-price-quantity/', //17
]
