import React, {Component} from "react";
import Aux from "../Auxilliary/Auxilliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import PropTypes from "prop-types";

import Classes from './Layout.module.css';

class Layout extends Component {
    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    toggleSideDrawerHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleSidebar={this.toggleSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={Classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

Layout.propTypes={
    open:PropTypes.bool,
    toggleSidebar:PropTypes.func,
    closed:PropTypes.func
}

export default Layout;