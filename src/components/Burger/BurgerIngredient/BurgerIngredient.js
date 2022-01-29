import React, {Component} from "react";
import PropTypes from "prop-types";
import Classes from "./BurgerIngredient.module.css"

class BurgerIngredient extends Component{
    constructor(props) {
        super(props);
    }
   render(){
        let ingredient = null;
        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className={Classes.BreadBottom}/>
                break;
            case 'bread-top':
                ingredient = (
                    <div className={Classes.BreadTop}>
                        <div className={Classes.Seeds1}/>
                        <div className={Classes.Seeds1}/>
                    </div>
                );
                break;
            case 'meat':
                ingredient = <div className={Classes.Meat}/>
                break;
            case 'salad':
                ingredient = <div className={Classes.Salad}/>
                break;
            case 'bacon':
                ingredient = <div className={Classes.Bacon}/>
                break;
            case 'cheese':
                ingredient = <div className={Classes.Cheese}/>
                break;
            default:
                ingredient=null
        }
        return ingredient;
    }
};

BurgerIngredient.propTypes={
    type:PropTypes.string.isRequired
}

export default BurgerIngredient;