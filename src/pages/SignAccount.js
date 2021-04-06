import React, {Component} from 'react';
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";
import WrapperSign from "../Components/WrapperSign";
import _ from "lodash";
import Account from "../helpers/Account";
import {allEventRequest, allMyEventRequest, singleEventRequest} from "../store/actions/events";
import MyEvents from "../Components/EventTabs/MyEvents";
import AllEvents from "../Components/EventTabs/AllEvents";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedTab: 'MyEvents'
        }
    }

    exitAccount = () => {
        Account.delete();
        window.location.href = '/';
    };

    handleClickAddEvent = () => {
        this.props.history.push('/add-event')
    };

    handleChangeTabs = (changedTab) => {
        this.setState({changedTab})
    };


    render() {
        const { user } = this.props;
        const {changedTab} = this.state;
        const image = _.get(user, ['picture', '0'], null);

        return (
            <WrapperSign>
                <img width={200} src={`http://localhost:4000/userImage/folder_${user._id}/${image}`} alt="image"/>
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.email}</p>
                {/*<div>{user?.picture?.map(i => <img*/}
                {/*    key={_.uniqueId(user._id)}*/}
                {/*    src={`http://localhost:4000/userImage/folder_${user._id}/${i}`}*/}
                {/*    alt="image" />)}</div>*/}
                <p>{user.phone}</p>
                <p>{user.age}</p>
                <div className="buttonsContainer">
                    <button onClick={this.handleClickAddEvent}>Add event</button>
                    <button onClick={this.exitAccount}>EXIT</button>
                </div>
                <div className="eventsTabsContainer">
                    <h1>Events</h1>
                    <button onClick={() => this.handleChangeTabs('MyEvents')}>My events</button>
                    <button onClick={() => this.handleChangeTabs('AllEvents')}>All events</button>
                    {changedTab === 'MyEvents' && <MyEvents userId={user._id} />}
                    {changedTab === 'AllEvents' && <AllEvents />}
                </div>
            </WrapperSign>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.users.user,
});
const mapDispatchToProps = {
    signInRequest,
    allMyEventRequest,
    allEventRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

export default Container;
