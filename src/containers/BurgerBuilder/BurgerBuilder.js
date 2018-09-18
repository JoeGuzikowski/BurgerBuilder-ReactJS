import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    beef: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = { 
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            beef: 0
        },
        totalPrice: 4,      //default price
        purchasable: false,  //anything on burger?
        ordering: false,    //modal open?
        loading: false
    }

    // componentDidMount () {
    //     axios.get('https://burger-builder-f207e.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data})
    //         })
    //         .catch(error => {});
    // }

    /* update purchasable if anything is on burger */
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                    .map(ingrKey => {
                        return ingredients[ingrKey];
                    })
                    .reduce((sum, el)=> {
                        return sum + el;
                    } ,0);
        this.setState({purchasable: sum > 0});
    }

    /* add ingredient and increase price */
    addIngredientHandler = (type) => {
        const updatedIngrCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngrCount;
        /* update price of burger */
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }
    
    /* reduce ingredient count by 1 and deduct from price */
    removeIngredientHandler = (type) => {
        /* if there's zero of a type, don't do anything */
        if (this.state.ingredients[type] === 0) {
            return;
        }

        const updatedIngrCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngrCount;
        /* update price of burger */
        const priceSubtraction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseContinuedHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    closeModalHandler = () => {
        this.setState({ordering:false});
    }

    render () {
        /* create array of bool to determine which '-' to disable */
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        /* either load orderSummary or loading animation */
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo} 
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={() => {this.setState({ordering:true})}}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            cancelled={() => {this.setState({ordering:false})}}
                            continued={this.purchaseContinuedHandler} 
                            price={this.state.totalPrice} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.ordering} 
                       closeModal={this.closeModalHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);