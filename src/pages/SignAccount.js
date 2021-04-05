import React, {Component} from 'react';
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";
import WrapperSign from "../Components/WrapperSign";
import _ from "lodash";
import Account from "../helpers/Account";
import {Link, Redirect} from "react-router-dom";

class SignIn extends Component {

  exitAccount = () => {
    Account.delete();
    window.location.href = '/';
  };

  handleClickAddEvent = () => {
    this.props.history.push('/add-event')
  };

  render() {
    const {user} = this.props;
    const image = _.get(user, ['picture', '0'], null);

    return (
      <WrapperSign>
        <img width={200} src={`http://localhost:4000/userImage/folder_${user._id}/${image}`} alt="image"/>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>{user.email}</p>
        {/*<div>{user?.picture?.map(i => <img*/}
        {/*    key={_.uniqueId(user._id)}*/}
        {/*    src={`http://localhost:4000/userImage/${user._id}/${i}`}*/}
        {/*    alt="image" />)}</div>*/}
        <p>{user.phone}</p>
        <p>{user.age}</p>
        <button onClick={this.handleClickAddEvent}>Add event</button>
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
