import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from './_helpers';
import { authenticationService } from './_services';
import { PrivateRoute } from './_components';
import { HomePage } from './Pages/HomePage';
import { AdminPage } from './Pages/AdminPage';
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
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isManager && <Link to="/employees" className="nav-item nav-link">Employees</Link>}
                                {<Link to="/products" className="nav-item nav-link">Products</Link>}
                                {<Link to="/store-products" className="nav-item nav-link">Store Products</Link>}
                                {<Link to="/categories" className="nav-item nav-link">Categories</Link>}
                                {<Link to="/checks" className="nav-item nav-link">Checks</Link>}
                                {<Link to="/customer-cards" className="nav-item nav-link">Customer Cards</Link>}
                                {<Link to="/queries" className="nav-item nav-link">Queries</Link>}
                                <a onClick={this.signOut} className="nav-item nav-link">Logout</a>
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
