import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    /** go back to previous page */
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    /** continue order to form */
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ ContactData } /> 
                </div>
            );
        }
        return summary;

    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps, null)(Checkout);