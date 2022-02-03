import React, {Component} from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Backdrop from "../Backdrop/Backdrop";

import Classes from "./Modal.module.css"

const Modal = props => {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.show !==props.show || nextProps.children!==props.children
    // }


    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                className={Classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    );
}

export default React.memo(Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children);