import React from "react";
import axios from "../../axios-orders";

import Order from '../../components/Order/Order';
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true,
        error: false,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        id: key,
                        ...res.data[key],
                    })
                }
                this.setState({ orders: orders, loading: false })
            })

            .catch(err => {
                console.log('error', err)
                this.setState({ loading: false, error: true })
            })
    }

    render() {
        let error = null;
        if (this.state.error) {
            error = <Modal show>Error</Modal>
        };
        
        let orders = this.state.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ))
        if (this.state.loading) {
            orders = <Spinner />
        }


        return (
            <div>
                {error}
                {orders}
            </div>
        );
    }
}

export default Orders;