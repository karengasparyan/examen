import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import _ from 'lodash';

class Wrapper extends Component {
    render() {
        const {token} = this.props;
        if (token){
            return <Redirect to="/account"/>
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
)(Wrapper);

export default Container;
