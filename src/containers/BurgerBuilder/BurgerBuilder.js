import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = { 
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
        return sum > 0;
    }

    purchaseContinuedHandler = () => {
        this.props.history.push('/checkout');
    }

    closeModalHandler = () => {
        this.setState({ordering:false});
    }

    render () {
        /* create array of bool to determine which '-' to disable */
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        /* either load orderSummary or loading animation */
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo} 
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={() => {this.setState({ordering:true})}}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                            ingredients={this.props.ingredients}
                            cancelled={() => {this.setState({ordering:false})}}
                            continued={this.purchaseContinuedHandler} 
                            price={this.props.totalPrice} />;
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingrName}),
        onIngredientRemoved: (ingrName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingrName})
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));