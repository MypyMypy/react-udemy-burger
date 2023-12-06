import React from "react";
import axios from "../../../axios-orders";
import classes from "./ContactData.module.css"

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";


class ContactData extends React.Component {
    constructor(props) {
        super(props);
        this.timers = {};
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name',
                    },
                    value: '',
                    validations: {
                        required: true,
                    },
                    touched: false,
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Teststreet 1',
                    },
                    value: '',
                    validations: {
                        required: true,
                    },
                    touched: false,
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Zip-Code',
                    },
                    value: '',
                    validations: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false,
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country',
                    },
                    value: '',
                    validations: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email',
                    },
                    value: '',
                    validations: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' }
                        ],
                    },
                    value: 'fastest', // default
                    validations: false,
                    valid: false,
                    touched: false,
                },
            },
            formIsValid: false,
            loading: false,
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.navigate('/')
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    inputChanchedHandler = async (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validations);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm })

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        
        if (this.timers[inputId]) {
            clearTimeout(this.timers[inputId])
        }

        this.timers[inputId] = setTimeout(()=> {
            this.setState({ formIsValid: formIsValid}, ()=> {
                console.log("Form Valid:", this.state.formIsValid)
            })
        }, 1000)

    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
            <form
                className={classes.Form}
                onSubmit={(e) => this.orderHandler(e)}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validations}
                        touched={formElement.config.touched}
                        chanched={(event) => this.inputChanchedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) form = <Spinner />

        return (
            <div className={classes.ContactData}>
                <h4>Enter youre Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;