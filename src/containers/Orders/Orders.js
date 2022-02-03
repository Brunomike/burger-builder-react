import React, {useEffect} from "react";
import {connect} from "react-redux";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
    const {onFetchOrders}=props

    useEffect(() => {
        onFetchOrders(props.token, props.userId)
    }, [onFetchOrders])


    let orders = <Spinner/>
    if (!props.loading) {
        if (props.orders.length > 0) {
            orders = <div>
                {props.orders.map(order => {
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                })}
            </div>
        } else {
            orders =
                <p>No orders found!</p>
        }
    }
    return orders;

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
