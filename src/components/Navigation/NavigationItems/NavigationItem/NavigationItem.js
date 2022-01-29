import React from "react";
import {NavLink} from "react-router-dom";
import Classes from "./NavigationItem.module.css";

const navigationItem = (props) => (
    <li className={Classes.NavigationItem}>
        <NavLink to={props.link} exact activeClassName={Classes.active}>{props.children}</NavLink>
        {/*className={props.active ? Classes.active : null}*/}
        {/*<a href={props.link}*/}
        {/*   className={props.active ? Classes.active : null}>*/}
        {/*    {props.children}</a>*/}
    </li>
);

export default navigationItem;