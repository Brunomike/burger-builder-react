import React, {Component} from "react";
import {connect} from "react-redux";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import * as actions from '../../store/actions/index';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice:0
    // }
    // componentWillMount() {
    //     const query=new URLSearchParams(this.props.location.search)
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if (param[0]==='price'){
    //             price=param[1]
    //         }else{
    //             ingredients[param[0]]=+param[1]
    //         }
    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price})
    // }

    // componentWillMount() {
    //     this.props.onInitPurchase()
    // }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/"/>

        if (this.props.ings) {
            const purchasedRedirect=this.props.purchased?<Redirect to="/"/>:null
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCheckoutCancelled={this.checkoutCancelHandler}
                    onCheckoutContinued={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        }
        return (
            <div>
                {summary}
                {/*<Route path={this.props.match.url+'/contact-data'} render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/> }/>*/}
                {/*<Route*/}
                {/*    path={this.props.match.path + "/contact-data"}*/}
                {/*    component={ContactData}*/}
                {/*/>*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps)(Checkout);