import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey]/* num ingredients*/)].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} icon={props.icon} />/* return <Ingredient/> per num ingr */
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Add some ingredients, fool. </p>
    }
    return (
        <div className={ [classes.Burger, props.icon ? classes.Icon : null].join(' ') }>
            <BurgerIngredient type="bread-top" icon={props.icon} />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" icon={props.icon} />
        </div>
    );
}

export default burger;