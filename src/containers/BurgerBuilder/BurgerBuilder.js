import React, {Component} from "react";
import {connect} from "react-redux";
import Aux from "../../hoc/Auxilliary/Auxilliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {Redirect} from "react-router-dom";
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        //ingredients: null,
        //totalPrice: 4,
        //purchasable: false,
        purchasing: false,
        // loading: false,
        // error: null
    }

    componentDidMount() {
        //console.log(this.props)
        // axios.get('https://myburger-react-9da4a-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         console.log(response)
        //         this.setState({ingredients: response.data})
        //     }).catch(err => {
        //     this.setState({error: true})
        // });
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients) {
        // const ingredients={
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);

        //this.setState({purchasable: sum > 0})
        return sum > 0

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        //const updatedCount=oldCount!==0?oldCount-1:0
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert("You continue!");
        // const queryParams = [];
        // for (let i in this, this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&')
        //
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        // let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>
        //if (this.state.ingredients) {
        if (this.props.ings) {
            burger = <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    //purchasable={this.state.purchasable}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.totalP}/>
            </Aux>

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                cancel={this.purchaseCancelHandler}
                progress={this.purchaseContinueHandler}
                totalPrice={this.props.totalP}/>
        }
        //
        // if (this.state.loading) {
        //     orderSummary = <Spinner/>
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalP: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));