import React, {Component} from 'react';
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";
import WrapperSign from "../Components/WrapperSign";
import _ from "lodash";
import Account from "../helpers/Account";

class SignIn extends Component {

    exitAccount = () => {
        Account.delete();
        window.location.href = '/';
    };

    render() {
        const {user} = this.props;

        return (
            <WrapperSign>
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.email}</p>
                <div>{user?.picture?.map(i=> <img
                    key={_.uniqueId(user._id)}
                    src={`http://localhost:4000/userImage/${user._id}/${i}`}
                    alt="image" />)}</div>
                <p>{user.phone}</p>
                <p>{user.password}</p>
                <p>{user.age}</p>
                <button onClick={this.exitAccount}>EXIT</button>
            </WrapperSign>
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
