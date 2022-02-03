import React, {useCallback, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Aux from "../../hoc/Auxilliary/Auxilliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    })

    const totalP = useSelector(state => {return state.burgerBuilder.totalPrice})
    const error = useSelector(state => {return state.burgerBuilder.error})
    const isAuthenticated = useSelector(state => {return state.auth.token !==null})

    const onIngredientAdded = (name) => dispatch(actions.addIngredient(name));
    const onIngredientRemoved = (name) => dispatch(actions.removeIngredient(name));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    //const {onInitIngredients}=props
    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])


    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0
    }



    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }

    const disabledInfo = {
        ...ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner/>

    if (ings) {
        burger = (<Aux>
            <Burger ingredients={ings}/>
            <BuildControls
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                disabled={disabledInfo}
                purchasable={updatePurchaseState(ings)}
                ordered={purchaseHandler}
                price={totalP}
                isAuth={isAuthenticated}
            />
        </Aux>);

        orderSummary = (<OrderSummary
            ingredients={ings}
            cancel={purchaseCancelHandler}
            progress={purchaseContinueHandler}
            totalPrice={totalP}/>)
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         totalP: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
//         onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     };
// }

export default connect(null, null)(withErrorHandler(BurgerBuilder, axios));