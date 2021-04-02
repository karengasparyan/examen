import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";
import _ from 'lodash';
import Account from "../helpers/Account";

class WrapperSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
    }

    componentDidMount() {
    }

    render() {
        const {token} = this.props;

        if (!token) {
            return <Redirect to="/"/>
        }

        return (
            <>
                {this.props.children}
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.users.token,
});
const mapDispatchToProps = {};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(WrapperSign);

export default Container;
