import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import Order from '../../../components/Order/Order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = (
                <div>
                    <h2 style={{textAlign: "center", margin: "auto"}} > All past orders </h2>
                        {this.props.orders.map(order => (
                            <Order 
                                price={+order.price}
                                ingredients={order.ingredients}
                                key={order.id} 
                                buyer={order.orderData.name}
                                />
                        ))}
                </div>
            );
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect( mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));