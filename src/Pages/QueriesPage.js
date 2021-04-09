import React from 'react';

import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let results = []
let titles = [
    "Всі касири, які обслуговували покупців із Kyiv",
    "Середня кількість товарів у чеку покупця",
    "Найпопулярніші товари в кожній категорії",
    "Найпопулярніші товари",
    "Продукти, які купує покупець 1, відсортовані за кількістю куплених товарів",
    "Покупець який витратив найбільше коштів на продукти з категорії 1",
    "Кількість товарів, які продаються по акції у кожній категорії",
    "Загальна сума всіх чеків кожного касира за останні 400 днів",
    "Покупці відсортовані за кількістю витрачених грошей",
    "Касири, які обслуговували всіх тих і тільки тих покупців, яких обслуговував Ivanenko",
    "Покупці, які обслуговувалися у всіх тих і тільки тих касирів, що і покупець Tokar",
    "Чеки із тими і тільки тими товарами що і у чеку 1"
]
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class QueriesPage extends React.Component {

    state = {
        currentUser: authenticationService.currentUserValue,
        parameter: "",
        currUrl: ""
    }

    onChange = e => {
        this.setState({ parameter: e.target.value });
    };

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }

    componentWillMount() {

        //Max
        let url2 = 'http://localhost:8080/api/query/multi-table2';
        let url8 = 'http://localhost:8080/api/query/group5/400';
        let url9 = 'http://localhost:8080/api/query/group6';
        let url12 = 'http://localhost:8080/api/query/double-not3/1';
        //Katya
        let url3 = 'http://localhost:8080/api/query/multi-table3';
        let url6 = 'http://localhost:8080/api/query/group3/1';
        let url7 = 'http://localhost:8080/api/query/group4';
        let url11 = 'http://localhost:8080/api/query/double-not2/Tokar';
        //Danya
        let url1 = 'http://localhost:8080/api/query/multi-table1/Kyiv';
        let url4 = 'http://localhost:8080/api/query/group1';
        let url5 = 'http://localhost:8080/api/query/group2/1';
        let url10 = 'http://localhost:8080/api/query/double-not1/Ivanenko';


        this.getData(url1)
        this.getData(url2)
        this.getData(url3)
        this.getData(url4)
        this.getData(url5)
        this.getData(url6)
        this.getData(url7)
        this.getData(url8)
        this.getData(url9)
        this.getData(url10)
        this.getData(url11)
        this.getData(url12)

    }


    getData(url) {
        const { currentUser } = this.state;
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(this.responseText)
                results.push(JSON.parse(this.responseText));
        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
        })
        // open the request with the verb and the url
        xhr.open('GET', url,false)
        xhr.setRequestHeader("Authorization", `Bearer ${currentUser.token}`)

        // send the request
        xhr.send()

    }
    handleSubmit = event => {
        event.preventDefault();
    }

    getDataTables = () =>{
        return results.map((myArr,index) => {
            let keys = Object.keys(myArr[0]);
            const columns = []
            keys.forEach(function (item, index) {
                console.log(item)
                columns.push({name: item, selector: item, sortable: true})
            })
            return (
                <div>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <label htmlFor="inputData">Параметр</label>
                        <div className="row">
                            <div className="col-md-3">
                                <input type="text" className="form-control" id="inputData" aria-describedby="dataHelp"
                                       placeholder="Введіть параметр" value={this.state.parameter} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <button type="submit" className="btn btn-primary">
                                    Пошук
                                </button>
                            </div>
                        </div>
                    </form>
                    <DataTable title={titles[index]} columns={columns}
                               className="datatable" data={myArr}  highlightOnHover pagination/>
                </div>
                );
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { QueriesPage };
