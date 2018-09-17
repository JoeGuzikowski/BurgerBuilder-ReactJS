import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                                .map(ingrKey => {
                                    return (
                                        <li key={ingrKey}>
                                            <span style={{textTransform: "capitalize"}}>
                                                {ingrKey}
                                            </span>: {props.ingredients[ingrKey]}
                                        </li>
                                            );
                                });

    return (
        <Aux>
            <h3> Your Order </h3>
            <p> A delicious burger with the following on it: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong> Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Aux>
    );
}


export default orderSummary;