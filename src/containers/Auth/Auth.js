import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { updateObject, checkValidity } from '../../utility/utility'; 
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {
    state = {
        orderForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isValid: false,
        isSignUp: true
    }


    inputChangedHandler = (event, inputName) => {
        // make deep copy
        const updatedForm = updateObject(this.state.orderForm, {
            [inputName]: updateObject(this.state.orderForm[inputName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[inputName].validation),
                touched: true
            })
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedForm, isValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
                this.state.orderForm.email.value, 
                this.state.orderForm.password.value,
                this.state.isSignUp
            );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        });
        // this.setState({isSignUp: !this.state.isSignUp});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}  
                invalid={ !formElement.config.valid }
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        // if the user is authenticated already, redirect to "/"
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            // if they're currently building a burger
            if (this.props.isBuilding) {
                authRedirect =  <Redirect to="/checkout" />
            }
            else {
                authRedirect =  <Redirect to="/" />
            }
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message.charAt(0) + this.props.error.message.slice(1).toLowerCase()}</p>
            );
        }

        return ( 
            <div className={classes.Auth}>
                { authRedirect }
                { errorMessage }
                <form onSubmit={(event) => this.submitHandler(event)}>
                    { form }
                    <Button 
                        btnType="Success" 
                        disabled={!this.state.isValid}> 
                            {!this.state.isSignUp ? 'Log in' : 'Sign up'}
                    </Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"> 
                        Switch to {this.state.isSignUp ? 'Log in' : 'Sign up'}
                </Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token ? true : false,
        isBuilding: state.burgerBuilder.isBuilding
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect( mapStateToProps, mapDispatchToProps)(Auth);