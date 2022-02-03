import './App.css';
import React, {useEffect, Suspense} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Routes, Switch} from "react-router";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index';


const asyncCheckout = React.lazy(() => {
    return import("./containers/Checkout/Checkout");
})

const asyncOrders = React.lazy(() => {
    return import("./containers/Orders/Orders");
})

const asyncAuth = React.lazy(() => {
    return import('./containers/Auth/Auth');
})

const App = props => {
    const {onTryAutoSignup}=props
    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup])

    let routes = (
        <Switch>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" component={asyncCheckout}/>
                <Route path="/orders" component={asyncOrders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );

};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
