import React from 'react';

import DataTable from "react-data-table-component";
import "../Styles/DataTable.styles.css"
import {authenticationService} from "../_services";

let results = []

let urls = []

class QueriesPage extends React.Component {

    state = {
        currentUser: authenticationService.currentUserValue,
        parameter: "",
        currUrl: "",
        currIndex: 0
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
    automateRefresh() {

            this.setState({ users: [] });
            urls.forEach(value =>{
                this.getData(value);
            })

    }

    componentWillMount() {
        results = []

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

        urls.push(url1);urls.push(url2);urls.push(url3);urls.push(url4);urls.push(url5);urls.push(url6);
        urls.push(url7);urls.push(url8);urls.push(url9);urls.push(url10);urls.push(url11);urls.push(url12);

        urls.forEach(value =>{
            this.getData(value);
        })

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
    handleSubmit(event, index) {
        event.preventDefault();
        results = [];
        urls[index] = `${urlsBase[index]}${this.state.parameter}`
        titles[index] = `${titlesBase[index]}${this.state.parameter}`

        this.automateRefresh();
    }
    handleChoice(index){
        this.setState({currIndex: index});
        // alert(this.state.currIndex)
        // this.automateRefresh()
    }

    getDataTables = () =>{
        return results.map((myArr,index) => {
            let keys = Object.keys(myArr[0]);
            const columns = []
            keys.forEach(function (item) {
                columns.push({name: item, selector: item, sortable: true, minWidth:`${13*item.length}px`})
            })
            if(index === parseInt(localStorage.getItem("currIndex"))) {
                if (index === 0 || index === 4 || index === 5 || index === 7 || index === 9 || index === 10 || index === 11) {
                    return (
                        <div className={"collapse-div"}>
                            <DataTable title={titles[index]} columns={columns}
                                       className="datatable" data={myArr} highlightOnHover pagination/>
                            <form className="form-group" onSubmit={event => {
                                this.handleSubmit(event, index)
                            }}>
                                <label htmlFor="inputData">????????????????</label>
                                <div className="row">
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" id="inputData"
                                               aria-describedby="dataHelp"
                                               placeholder="?????????????? ????????????????"
                                               onChange={this.onChange}/>
                                        <button type="submit" className="btn btn-primary">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    );
                } else {
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
export { QueriesPage };


let titles = [
    "?????? ????????????, ?????? ?????????????????????????? ???????????????? ???? Kyiv",
    "?????????????? ?????????????????? ?????????????? ?? ???????? ??????????????",
    "???????????????????????????? ???????????? ?? ???????????? ??????????????????",
    "???????????????????????????? ????????????",
    "???????????????????????? ???? ?????????????????? ???????????????? ?????????????? ????????????????, ?????? ?????????? ???????????????? 1",
    "???????????????? ???????? ???????????????? ?????????????????? ???????????? ???? ???????????????? ?? ?????????????????? 1",
    "?????????????????? ??????????????, ?????? ???????????????????? ???? ?????????? ?? ???????????? ??????????????????",
    "???????????????? ???????? ???????? ?????????? ?????????????? ???????????? ???? ?????????????? ???????? 400",
    "?????????????? ???????????????????????? ???? ?????????????????? ???????????????????? ????????????",
    "????????????, ?????? ?????????????????????????? ???????? ?????? ?? ???????????? ?????? ????????????????, ???????? ???????????????????????? Ivanenko",
    "??????????????, ?????? ?????????????????????????????? ?? ???????? ?????? ?? ???????????? ?????? ??????????????, ???? ?? ???????????????? Tokar",
    "???????? ???? ???????? ?? ???????????? ???????? ???????????????? ???? ?? ?? ???????? 1"
]
let titlesBase = [
    "?????? ????????????, ?????? ?????????????????????????? ???????????????? ???? ",
    "?????????????? ?????????????????? ?????????????? ?? ???????? ??????????????",
    "???????????????????????????? ???????????? ?? ???????????? ??????????????????",
    "???????????????????????????? ????????????",
    "???????????????????????? ???? ?????????????????? ???????????????? ?????????????? ????????????????, ?????? ?????????? ???????????????? ",
    "???????????????? ???????? ???????????????? ?????????????????? ???????????? ???? ???????????????? ?? ?????????????????? ",
    "?????????????????? ??????????????, ?????? ???????????????????? ???? ?????????? ?? ???????????? ??????????????????",
    "???????????????? ???????? ???????? ?????????? ?????????????? ???????????? ???? ?????????????? ???????? ",
    "?????????????? ???????????????????????? ???? ?????????????????? ???????????????????? ????????????",
    "????????????, ?????? ?????????????????????????? ???????? ?????? ?? ???????????? ?????? ????????????????, ???????? ???????????????????????? ",
    "??????????????, ?????? ?????????????????????????????? ?? ???????? ?????? ?? ???????????? ?????? ??????????????, ???? ?? ???????????????? ",
    "???????? ???? ???????? ?? ???????????? ???????? ???????????????? ???? ?? ?? ???????? "
]

let urlsBase = [
    'http://localhost:8080/api/query/multi-table1/',
    'http://localhost:8080/api/query/multi-table2',
    'http://localhost:8080/api/query/multi-table3',
    'http://localhost:8080/api/query/group1',
    'http://localhost:8080/api/query/group2/',
    'http://localhost:8080/api/query/group3/',
    'http://localhost:8080/api/query/group4',
    'http://localhost:8080/api/query/group5/',
    'http://localhost:8080/api/query/group6',
    'http://localhost:8080/api/query/double-not1/',
    'http://localhost:8080/api/query/double-not2/',
    'http://localhost:8080/api/query/double-not3/'
]
