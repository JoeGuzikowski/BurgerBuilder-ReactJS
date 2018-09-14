import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> I hope it tastes good. </h1>
            <div style={{width: '300px', height:'300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>

            <Button btnType="Danger" clicked> CANCEL </Button>
            <Button btnType="Success" clicked> CANCEL </Button>
        </div>
    );
}

export default CheckoutSummary;