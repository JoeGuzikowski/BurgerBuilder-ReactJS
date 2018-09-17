import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Order from '../../../components/Order/Order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        return ( 
            <div>
                <h2 style={{textAlign: "center", margin: "auto"}} > All past orders </h2>
                {this.state.orders.map(order => (
                    <Order 
                        price={+order.price}
                        ingredients={order.ingredients}
                        key={order.id} 
                        buyer={order.orderData.name}
                        />
                ))}
            </div>
        );
}}

export default withErrorHandler(Orders, axios);