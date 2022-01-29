import React from "react";

import appLogo from "../../assets/images/28.1 burger-logo.png";
import Classes from "./Logo.module.css"

const logo=(props)=>(
    <div className={Classes.Logo} style={{height:props.height}}>
        <img src={appLogo}  alt="MyBurger Logo"/>
    </div>
);

export default logo;