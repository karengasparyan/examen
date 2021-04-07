import React, {Component} from 'react';
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";
import _ from "lodash";
import {Link, Redirect} from "react-router-dom";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            errors: {
                email: '',
                password: '',
            },
        }
    }

    inputValidate = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const {errors} = this.state;

        switch (name) {
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Invalid email';
                break;
            case 'password':
                errors.password = value.length < 3 ? 'this is a required field min 3 symbol' : '';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});
    };

    handleChange = (ev, i) => {
        this.setState({values: {...this.state.values, [i]: ev.target.value}})
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const {values, errors} = this.state;
        this.props.signInRequest(values.email, values.password, async (error, data) => {
            if (error) {
                if (_.isEmpty(values)) {
                    errors.email = this.props.error.email;
                    errors.password = this.props.error.password;
                    this.setState({errors});
                }
                return;
            }
        });
    };

    render() {
        const {values, errors} = this.state;
        const {token, error} = this.props;
        if (token){
            return <Redirect to="/account"/>
        }
        return (
            <div className="formContainer">
                <form className="signForm" onSubmit={this.handleSubmit}>
                    <h1 className="titles">Sign In</h1>
                    <label className="labels" htmlFor="email">Email</label>
                    <input
                        onChange={(ev) => this.handleChange(ev, 'email')}
                        onBlur={this.inputValidate}
                        type="text"
                        value={values.email}
                        id="email"
                        name="email"
                        className="inputs"
                    />
                    <p className="errors">{errors.email}</p>
                    <label className="labels" htmlFor="password">Password</label>
                    <input
                        onChange={(ev) => this.handleChange(ev, 'password')}
                        onBlur={this.inputValidate}
                        type="password"
                        value={values.password}
                        id="password"
                        name="password"
                        className="inputs"
                    />
                    <p className="errors">{errors.password}</p>
                    <button className="buttons" type='submit'>Sign in</button>
                    {error.email && <span className="errors">{error.email}</span>}
                    {error.password && <span className="errors">{error.password}</span>}
                    <div className="signUpInfoContainer">
                        <span className="signUpInfo">if there is no account?</span>
                        <Link className="signUpInfoLink" to="/sign-up" >sign up</Link>
                    </div>
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.users.token,
    error: state.users.error,
});
const mapDispatchToProps = {
    signInRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

export default Container;
