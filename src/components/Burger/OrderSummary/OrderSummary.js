import React, {Component} from "react";
import Aux from '../../../hoc/Auxilliary/Auxilliary'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log('[OrderSummary] willUpdate')
    // }
    //

    render() {
        const ingredientsSummary=Object.keys(this.props.ingredients)
            .map(igKey=>{
                return(
                    <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                );
            });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>

                <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.progress}>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;