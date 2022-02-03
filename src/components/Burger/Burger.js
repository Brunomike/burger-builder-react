import React from "react";
import {withRouter} from 'react-router-dom'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import Classes from "./Burger.module.css"

const burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                return <BurgerIngredient key={igKey+i} type={igKey}/>
            })
        }).reduce((prevValue,currentValue)=>{
            return prevValue.concat(currentValue)
        },[]);

    if (transformedIngredients.length===0){
        transformedIngredients=<p>Please start adding ingredients!</p>
    }

    return(
        <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);