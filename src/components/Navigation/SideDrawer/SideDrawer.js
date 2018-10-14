import React from 'react';

import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedClasses;
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(" ");
    }
    else {
        attachedClasses = [classes.SideDrawer, classes.Close].join(" ");
    }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.toggleShow} />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} closeDrawer={props.toggleShow}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;