import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import Classes from "./Toolbar.module.css";

const toolbar = (props) => (
    <header className={Classes.Toolbar}>
        <DrawerToggle click={props.toggleSidebar}/>
        <div className={Classes.Logo}>
            <Logo/>
        </div>
        <nav className={Classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;