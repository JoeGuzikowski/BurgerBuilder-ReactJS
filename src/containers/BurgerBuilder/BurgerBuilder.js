import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import * as burgerBuilderActions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = { 
        ordering: false,    //modal open?
        loading: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

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

    openModalHandler = () => {
        // if (this.props.isAuthenticated) {
        //     this.setState({ordering: true});
        // }
        // else {
        //     this.props.history.push('/auth');
        // }
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth');
        }
        this.setState({ordering: true});

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
                        ordered={this.openModalHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                            ingredients={this.props.ingredients}
                            cancelled={() => {this.setState({ordering:false})}}
                            continued={this.purchaseContinuedHandler} 
                            price={this.props.totalPrice} />;
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token ? true : false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));