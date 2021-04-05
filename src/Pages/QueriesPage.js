import React from 'react';

import { userService } from '@/_services';
import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {Button} from "@material-ui/core";
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
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        }
    }

    componentWillMount() {
        let url1 = 'http://localhost:8080/api/query/multi-table1/Kyiv';
        let url2 = 'http://localhost:8080/api/query/multi-table2';
        let url3 = 'http://localhost:8080/api/query/multi-table3';
        let url4 = 'http://localhost:8080/api/query/group1';
        let url5 = 'http://localhost:8080/api/query/group2/1';
        let url6 = 'http://localhost:8080/api/query/group3/1';
        let url7 = 'http://localhost:8080/api/query/group4';
        let url8 = 'http://localhost:8080/api/query/group5/400';
        let url9 = 'http://localhost:8080/api/query/group6';
        let url10 = 'http://localhost:8080/api/query/double-not1/Ivanenko';
        let url11 = 'http://localhost:8080/api/query/double-not2/Tokar';
        let url12 = 'http://localhost:8080/api/query/double-not3/1';
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
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
        // create a new XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            results.push(JSON.parse(this.responseText));
        };
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
        })
        // open the request with the verb and the url
        xhr.open('GET', url,false)
        // send the request
        xhr.send()

    }

    getDataTables = () =>{
        return results.map((myArr,index) => {
            console.log(myArr)
            const { currentUser, userFromApi } = this.state;
            // if(myArr.length>0) {
                let keys = Object.keys(myArr[0]);
                const columns = []
                keys.forEach(function (item, index) {
                    console.log(item)
                    columns.push({name: item, selector: item, sortable: true})
                })
                return (
                    <div>
                        <DataTable title={titles[index]} columns={columns}
                                   className="datatable" data={myArr}  highlightOnHover pagination/>
                    </div>
                );
            // }


        })
    }

    render() {
        return(
            <div>
                {this.getDataTables()}
            </div>
        );
        // let nQuery = 1;
        // // const { currentUser, userFromApi } = this.state;
        // let myArr = results[0]
        //
        // if(myArr.length>0) {
        //
        //     let keys = Object.keys(myArr[0]);
        //     const columns = []
        //
        //     keys.forEach(function (item, index) {
        //         console.log(item)
        //         columns.push({name: item, selector: item, sortable: true})
        //     })
        //
        //     if (currentUser.role === 'Manager') {
        //         columns.push({
        //             cell: () => <Button variant={"outlined"} color="primary" size={"small"}>Edit</Button>,
        //             button: true,
        //         })
        //         return (
        //             <div>
        //                 <DataTable title={titles[nQuery]} columns={columns}
        //                            className="datatable" data={myArr}  highlightOnHover pagination/>
        //             </div>
        //         );
        //     } else return (
        //         <div>
        //             <DataTable title={titles[nQuery]} columns={columns}
        //                        className="datatable" data={myArr} highlightOnHover pagination/>
        //         </div>
        //     );
        // } else return (
        //     <div>
        //         No results
        // </div>
        // );

    }

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { QueriesPage };
