import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from './_helpers';
import { authenticationService } from './_services';
import { PrivateRoute } from './_components';
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
import {EmployeesPage} from "./Pages/EmployeesPage";
import {ProductsPage} from "./Pages/ProductsPage";
import {CategoriesPage} from "./Pages/CategoriesPage";
import {StoreProductsPage} from "./Pages/StoreProductsPage";
import {ChecksPage} from "./Pages/ChecksPage";
import {CustomerCardsPage} from "./Pages/CustomerCardsPage";
import {QueriesPage} from "./Pages/QueriesPage";
import {SignUpPage} from "./Pages/SignUpPage";
import {AddingPage} from "./Pages/AddingPage";
import {EditingPage} from "./Pages/EditingPage";
import {ManagerQueriesPage} from "./Pages/ManagerQueriesPage";
import {CashierQueriesPage} from "./Pages/CashierQueriesPage";
import {SalesPage} from "./Pages/SalesPage";

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isManager: false
        };
    }

    componentWillMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isManager: x && x.roles[0] === Role.Manager
        }));
    }

    signOut() {
        authenticationService.signOut();
        history.push('/login');
    }

    render() {
        let { currentUser, isManager } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <Link to="/" className="navbar-brand nav-item nav-link">Zlagoda</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        {isManager && <Link to="/employees" className="nav-item nav-link">Employees</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {<Link to="/products" className="nav-item nav-link">Products</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {<Link to="/store-products" className="nav-item nav-link">Store Products</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {<Link to="/categories" className="nav-item nav-link">Categories</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {<Link to="/checks" className="nav-item nav-link">Checks</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {<Link to="/customer-cards" className="nav-item nav-link">Customer Cards</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {<Link to="/sales" className="nav-item nav-link">Sales</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {isManager && <Link to="/manager-queries" className="nav-item nav-link">Manager Queries</Link>}
                                    </li>
                                    <li className="nav-item">
                                        {<Link to="/cashier-queries" className="nav-item nav-link">Cashier Queries</Link>}
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={this.signOut} className="nav-item nav-link">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute path="/employees" roles={[Role.Manager]} component={EmployeesPage} />
                            <PrivateRoute path="/products" component={ProductsPage} />
                            <PrivateRoute path="/store-products" component={StoreProductsPage} />
                            <PrivateRoute path="/categories" component={CategoriesPage} />
                            <PrivateRoute path="/checks" component={ChecksPage} />
                            <PrivateRoute path="/customer-cards" component={CustomerCardsPage} />
                            <PrivateRoute path="/queries" component={QueriesPage} />
                            <PrivateRoute path="/sales" component={SalesPage} />
                            <PrivateRoute path="/manager-queries" roles={[Role.Manager]} component={ManagerQueriesPage} />
                            <PrivateRoute path="/cashier-queries" component={CashierQueriesPage} />
                            <PrivateRoute path="/add/:req" component={AddingPage} />
                            <PrivateRoute path="/edit/:req" component={EditingPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignUpPage} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 
