import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilliary/Auxilliary";

import Classes from "./SideDrawer.module.css";


const sideDrawer = (props) => {
    let attachedClasses=[Classes.SideDrawer,Classes.Close];
    if (props.open){
        attachedClasses=[Classes.SideDrawer,Classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={Classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>

        </Aux>
    );
};
export default sideDrawer;

