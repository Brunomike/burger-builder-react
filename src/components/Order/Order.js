import React from "react";
import Classes from './Order.module.css'

const order = (props) => {
    const ingredientsArray = [];
    for (const key in props.ingredients) {
        ingredientsArray.push(
            {
                name: key,
                amount: props.ingredients[key]
            }
        );
    }
    //console.log(props.price)

    // {Object.entries(props.ingredients).forEach(([key,value])=>
    //     console.log(`${}: (${value})`)
    // )}

    return (
        <div className={Classes.Order}>
            <p>Ingredients:</p>

            {/*<div className={Classes.Ingredients}>*/}
                {ingredientsArray.map(el=>{
                    //return <div key={el.name}><span>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</span> <span>{el.amount}</span></div>
                    return <span className={Classes.Ingredient} key={el.name}>{el.name} {el.amount}</span>
                })}
            {/*</div>*/}

            <p><strong>PRICE: USD {props.price}</strong></p>
        </div>
    )
}

export default order;

//Quality Implementation Potential Impact