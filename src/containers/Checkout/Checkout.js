import React from "react";
import {connect} from "react-redux";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Redirect, Route} from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import * as actions from '../../store/actions/index';

const Checkout = props => {

    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data')
    }


    let summary = <Redirect to="/"/>

    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null
        summary = <div>
            {purchasedRedirect}
            <CheckoutSummary
                ingredients={props.ings}
                onCheckoutCancelled={checkoutCancelHandler}
                onCheckoutContinued={checkoutContinueHandler}
            />
            <Route
                path={props.match.path + "/contact-data"}
                component={ContactData}
            />
        </div>
    }
    return (
        <div>
            {summary}
            {/*<Route path={props.match.url+'/contact-data'} render={(props)=><ContactData ingredients={state.ingredients} price={state.totalPrice} {...props}/> }/>*/}
            {/*<Route*/}
            {/*    path={props.match.path + "/contact-data"}*/}
            {/*    component={ContactData}*/}
            {/*/>*/}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, null)(Checkout);