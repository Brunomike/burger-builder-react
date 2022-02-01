import React, {Component} from "react";
import Button from '../../components/UI/Button/Button';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Classes from './ContactData.module.css'
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {updateObject,checkValidity} from "../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false,
        // loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        //this.setState({loading: true})
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalP,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token)
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false})
        //         //this.setState({purchasing: false})
        //         console.log(this.props.history)
        //         this.props.history.replace('/')
        //
        //     })
        //     .catch(error => {
        //         this.setState({loading: false})
        //     });
    }


    inputChangedHandler = (e, inputIdentifier) => {
        //const updatedOrderForm = {...this.state.orderForm}
        const updatedFormElement = updateObject(
            this.state.orderForm[inputIdentifier], {
                value: e.target.value,
                valid: checkValidity(e.target.value,this.state.orderForm[inputIdentifier].validation),
                touched: true
            })
        const updatedOrderForm=updateObject(
            this.state.orderForm,{
                [inputIdentifier]:updatedFormElement
            }
        )
        // {...updatedOrderForm[inputIdentifier]}
        //updatedFormElement.value = e.target.value;


        //if (updatedFormElement.valid || !updatedFormElement.valid) {
        // updatedFormElement.touched = true
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        //updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true;
        for (let inputIdentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid
        }
        //}

        //console.log(updatedFormElement)
        //console.log(formIsValid)

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key, config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return <Input key={formElement.id}
                                  elementType={formElement.config.elementType}
                                  elementConfig={formElement.config.elementConfig}
                                  value={formElement.config.value}
                                  invalid={!formElement.config.valid}
                                  shouldValidate={formElement.config.validation}
                                  touched={formElement.config.touched}
                                  changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                })}

                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

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