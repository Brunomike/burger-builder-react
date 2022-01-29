import React from "react";
import Classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses=[Classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(Classes.Invalid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ('select'):
            inputElement= (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option=>{
                        return <option key={option.value} value={option.value}  >{option.displayValue}</option>
                    })}
                </select>
            );
            break;

        default:
            inputElement = <input className={Classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    return (
        <div className={Classes.Input}>
            <label className={Classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;