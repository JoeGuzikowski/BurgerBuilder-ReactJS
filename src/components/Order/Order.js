import React from 'react';

import Burger from '../Burger/Burger';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className={classes.IngredientSpan}
                    key={ig.name}> 
                    {ig.name} ({ig.amount}) 
                </span>
    });

    return (
        <div className={classes.Order}>
            <Burger icon="true" className={classes.Burger} ingredients={props.ingredients} />
            <div className={classes.Info} >
                <p> Burger Name: {props.buyer} </p>
                <p> Ingredients: { ingredientOutput } </p>          
                <p> Price: <strong> ${props.price.toFixed(2)} USD </strong> </p>
            </div>
        </div>
    );
}

export default order;