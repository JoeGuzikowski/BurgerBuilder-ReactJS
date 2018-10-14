import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) =>(
    <li className={classes.NavigationItem}>
        <NavLink 
            exact={props.exact} 
            to={props.link} 
            activeClassName={classes.active}
            onClick={props.onClick} >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;