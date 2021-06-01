import React, {Component} from 'react';
import {signInRequest} from "../store/actions/users";
import {connect} from "react-redux";
import WrapperSign from "../Components/WrapperSign";
import _ from "lodash";
import Account from "../helpers/Account";
import {allEventRequest, allMyEventRequest, singleEventRequest} from "../store/actions/events";
import MyEvents from "../Components/EventTabs/MyEvents";
import classNames from "classnames";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedTab: 'MyEvents',
            message: '',
        }
        this.socket = socketIOClient(ENDPOINT);
    }

    exitAccount = () => {
        Account.delete();
        window.location.href = '/';
    };

    handleChangeTabs = (changedTab) => {
        this.setState({changedTab})
    };

    handleChangeMessage = (ev) => {
        this.setState({message: ev.target.value})
    }

    sendMessage = () => {
        this.socket.emit('chat message', this.state.message);
    }

    render() {
        const {user} = this.props;
        const {changedTab, message} = this.state;
        const image = _.get(user, ['picture', '0'], null);
        return (
            <WrapperSign>
                <input
                    placeholder="message"
                    type="text"
                    value={message}
                    onChange={this.handleChangeMessage}
                />
                <button onClick={this.sendMessage}>send message</button>
                <div className="profileContainer">
                    <div className="profileData">
                        <img width={200} src={`http://localhost:4000/userImage/folder_${user._id}/${image}`} alt="image"/>
                        <p className="profileText">{user._id}</p>
                        <p className="profileText">{user.first_name}</p>
                        <p className="profileText">{user.last_name}</p>
                        <p className="profileText">{user.email}</p>
                        <p className="profileText">{user.phone}</p>
                        <p className="profileText">{user.age}</p>
                        <button className="buttons" onClick={this.exitAccount}>EXIT</button>
                    </div>
                    <div className="eventsTabsContainer">
                        <h1>Events</h1>

                        <button
                            className={classNames('buttons', changedTab === 'MyEvents' && 'active')}
                            onClick={() => this.handleChangeTabs('MyEvents')}>
                            My events
                        </button>
                        <button
                            className={classNames('buttons', changedTab === 'AllEvents' && 'active')}
                            onClick={() => this.handleChangeTabs('AllEvents')}>
                            All events
                        </button>
                        <button
                            className={classNames('buttons', changedTab === 'FollowEvents' && 'active')}
                            onClick={() => this.handleChangeTabs('FollowEvents')}>
                            Follow events
                        </button>
                        <button
                            className={classNames('buttons', changedTab === 'FollowRequest' && 'active')}
                            onClick={() => this.handleChangeTabs('FollowRequest')}>
                            Follow request
                        </button>

                        {changedTab === 'MyEvents' && <MyEvents userId={user._id}/>}
                        {changedTab === 'AllEvents' && <MyEvents eventTab="AllEvents" userId={user._id}/>}
                        {changedTab === 'FollowEvents' && <MyEvents eventTab="FollowEvents" userId={user._id}/>}
                        {changedTab === 'FollowRequest' && <MyEvents eventTab="FollowRequest" userId={user._id}/>}
                    </div>
                </div>
            </WrapperSign>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.users.user,
    myEvents: state.events.myEvents,
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
