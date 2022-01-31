import React from "react";
import BuildControl from "./BuildControl/BuildControl"

import Classes from "./BuildControls.module.css";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={Classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map((control) => {
                return <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                />
            })}

            <button
                className={Classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth?"ORDER NOW":"SIGN UP TO ORDER"}
            </button>
        </div>
    )
}

export default buildControls;