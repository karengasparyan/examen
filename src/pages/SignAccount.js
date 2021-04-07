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

    handleChangeTabs = (changedTab) => {
        this.setState({changedTab})
    };


    render() {
        const {user} = this.props;
        const {changedTab} = this.state;
        const image = _.get(user, ['picture', '0'], null);

        return (
            <WrapperSign>
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

                        <button className="buttons" onClick={() => this.handleChangeTabs('MyEvents')}>My events</button>
                        <button className="buttons" onClick={() => this.handleChangeTabs('AllEvents')}>All events</button>
                        <button className="buttons" onClick={() => this.handleChangeTabs('FollowEvents')}>Follow events</button>
                        <button className="buttons" onClick={() => this.handleChangeTabs('FollowRequest')}>Follow request</button>

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
