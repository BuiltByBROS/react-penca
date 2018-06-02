import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from "../../../hoc/Aux/Aux";

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
	      <NavigationItem link="/dashboard">Dashboard</NavigationItem>
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;
