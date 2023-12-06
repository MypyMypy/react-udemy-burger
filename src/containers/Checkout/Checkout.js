import React from "react";
import { Routes, Route } from "react-router-dom";
import withRouter from "../../hoc/WithRouter/withRouter";

import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends React.Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        },
        totalPrice: 0,
        checkoutContinued: false,
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.router.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0]=== 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
            
        };
        console.log('[Checkout] didMount', this.state.ingredients)
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

    checkoutCancelledHandler = () => {
        this.setState({checkoutContinued: false})
        this.props.router.navigate(-1)
    };

    checkoutContinuedHandler = () => {
        if (!this.state.checkoutContinued) {
            this.setState({checkoutContinued: true})
            this.props.router.navigate(this.props.router.location.pathname + '/contact-data')
        }
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Routes>
                    <Route
                        path={'/contact-data'}
                        element={<ContactData {...this.props.router} ingredients={this.state.ingredients} price={this.state.totalPrice}/>} />
                </Routes>
            </div>
        );
    }
}

export default withRouter(Checkout);