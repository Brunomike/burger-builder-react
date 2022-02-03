import React, {Component, useState} from "react";
import {connect} from "react-redux";
import Aux from "../Auxilliary/Auxilliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import PropTypes from "prop-types";

import Classes from './Layout.module.css';

const layout = props => {
    const [sideDrawerVisibility, setSideDrawerVisibility] = useState(false);
    // state={
    //     showSideDrawer:false
    // }

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false)
    }

    const toggleSideDrawerHandler = () => {
        setSideDrawerVisibility(!sideDrawerVisibility)
    }


        return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    toggleSidebar={toggleSideDrawerHandler}/>
                <SideDrawer isAuth={props.isAuthenticated} open={sideDrawerVisibility}
                            closed={sideDrawerClosedHandler}/>
                <main className={Classes.Content}>{props.children}</main>
            </Aux>
        )

}

layout.propTypes = {
    open: PropTypes.bool,
    toggleSidebar: PropTypes.func,
    closed: PropTypes.func
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);