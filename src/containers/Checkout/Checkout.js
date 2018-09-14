import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 1,
            beef: 1,
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        console.log(query.entries());
        const ingredients = {};
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1]; 
        }
        this.setState({ingredients: ingredients});
    }

    /** go back to previous page */
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    /** continue order to form */
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return ( 
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        );

    }
}

export default Checkout;