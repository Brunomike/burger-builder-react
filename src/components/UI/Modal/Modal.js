import React, {Component} from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Backdrop from "../Backdrop/Backdrop";

import Classes from "./Modal.module.css"
class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !==this.props.show || nextProps.children!==this.props.children
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[Modal] WillUpdate')
    }

    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={Classes.Modal}
                    style={{
                        transform:this.props.show?'translateY(0)':'translateY(-100vh)',
                        opacity:this.props.show?'1':'0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;