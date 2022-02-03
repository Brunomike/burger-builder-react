import React, {Component, useState} from "react";
import Button from '../../components/UI/Button/Button';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Classes from './ContactData.module.css'
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from "../../shared/utility";

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    })
    const [formValidity, setFormValidity] = useState(false);


    const orderHandler = (e) => {
        e.preventDefault()
        //setState({loading: true})
        const formData = {}
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.totalP,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token)

    }


    const inputChangedHandler = (e, inputIdentifier) => {
        //const updatedOrderForm = {...state.orderForm}
        const updatedFormElement = updateObject(
            orderForm[inputIdentifier], {
                value: e.target.value,
                valid: checkValidity(e.target.value, orderForm[inputIdentifier].validation),
                touched: true
            })
        const updatedOrderForm = updateObject(
            orderForm, {
                [inputIdentifier]: updatedFormElement
            }
        )


        let formIsValid = true;
        for (let inputIdentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid
        }
        setOrderForm(updatedOrderForm)
            setFormValidity(formIsValid)

        //setState({orderForm: updatedOrderForm, form: formIsValid})
    }


    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key, config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => {
                return <Input key={formElement.id}
                              elementType={formElement.config.elementType}
                              elementConfig={formElement.config.elementConfig}
                              value={formElement.config.value}
                              invalid={!formElement.config.valid}
                              shouldValidate={formElement.config.validation}
                              touched={formElement.config.touched}
                              changed={(event) => inputChangedHandler(event, formElement.id)}/>
            })}

            <Button btnType="Success" disabled={formValidity}>ORDER</Button>
        </form>);
    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={Classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );


}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalP: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));