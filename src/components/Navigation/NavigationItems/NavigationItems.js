import React from 'react';

import classes from './NavigationItems.css';

import Aux from '../../../hoc/Aux/Aux';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" onClick={props.closeDrawer} exact>Burger Builder</NavigationItem>
        {props.isAuthenticated
            ? <Aux> 
                <NavigationItem onClick={props.closeDrawer} link="/orders">Orders</NavigationItem>
                <NavigationItem onClick={props.closeDrawer} link="/logout"> Logout </NavigationItem> 
              </Aux>
            : <NavigationItem onClick={props.closeDrawer} link="/auth"> Login / Signup </NavigationItem> }
    </ul>
);

export default navigationItems;