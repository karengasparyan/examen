import React, {Component, Fragment} from 'react';
import axios from "axios";
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";
import Wrapper from "../Components/Wrapper";
import _ from "lodash";
import {Link, Redirect} from "react-router-dom";
import WrapperSign from "../Components/WrapperSign";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
        }
    }

    componentDidMount() {

    }

    handleChange = (ev, i) => {
        this.setState({values: {...this.state.values, [i]: ev.target.value}})
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const {values} = this.state;
        this.props.signInRequest(values.email, values.password);
    };

    render() {
        const {values} = this.state;
        const {token} = this.props;
        if (token){
            return <Redirect to="/account"/>
        }
        return (
            <>
                <h1>Sign In</h1>
                <Link to="/sign-up" ><h1>Sign Up</h1></Link>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(ev) => this.handleChange(ev, 'email')}
                        type="text"
                        value={values.email}
                        id="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={(ev) => this.handleChange(ev, 'password')}
                        type="password"
                        value={values.password}
                        id="password"
                    />
                    <button type='submit'>sign in</button>
                </form>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.users.token,
});
const mapDispatchToProps = {
    signInRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

export default Container;
