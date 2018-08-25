import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Beef', type: 'beef'},

];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> Current Price: <strong>${props.price.toFixed(2)}</strong> </p>
        {controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label} 
                add={() => props.addIngredient(control.type)} 
                /* add={props.addIngredient.bind(this, control.type)}*/ 
                remove={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}//bool
            />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}>
            ORDER NOW
        </button>
    </div>
);

export default BuildControls;