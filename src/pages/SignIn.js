import React, {Component, Fragment} from 'react';
import axios from "axios";
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";

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

    handleSubmit = () => {
        const {email, password} = this.state;
        this.props.signInRequest(email, password);
    };

    render() {
        const {values} = this.state;
        const {user} = this.props;
        console.log(user);
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={(ev) => this.handleChange(ev, 'email')}
                        type="text"
                        value={values.email}
                    />
                    <input
                        onChange={(ev) => this.handleChange(ev, 'password')}
                        type="text"
                        value={values.password}
                    />
                    <button type='submit'>sign in</button>
                </form>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.users.user,

});
const mapDispatchToProps = {
    signInRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

export default Container;
