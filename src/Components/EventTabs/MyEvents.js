import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {
    allEventRequest,
    allMyEventRequest,
    deleteEventRequest,
    deleteRequestEventRequest,
    getPendingEventRequest,
    getSuccessEventRequest,
    pendingEventRequest,
    singleEventRequest, successEventRequest
} from "../../store/actions/events";
import {withRouter} from "react-router-dom";
import memoizeOne from "memoize-one";

class MyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.intervalRequest = null;
    }

    componentDidMount() {
        const {userId, eventTab} = this.props;
        this.props.allMyEventRequest(userId, null, 1);
        if (eventTab === 'AllEvents') {
            this.props.allEventRequest(userId, null, 1);
        }
        if (eventTab === 'FollowRequest') {
            this.props.getPendingEventRequest(userId);
            this.intervalRequest = setInterval(() => {
                this.props.getPendingEventRequest(userId)
            },60000)
        }
        if (eventTab === 'FollowEvents') {
            this.props.getSuccessEventRequest(userId);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalRequest);
    }

    deleteEvent = (userId, eventId) => {
        this.props.deleteEventRequest(userId, eventId, async (error, data) => {
            if (error) {

                return;
            }
            this.props.allMyEventRequest(userId, null, 1);
        });
    };

    handleClickAddEvent = () => {
        this.props.history.push('/add-event')
    };

    editEvent = (ev) => {
        this.props.singleEventRequest(ev, async (error, data) => {
            if (error) {
                return;
            }
            this.props.history.push(`/edit-event/${ev}`)
        });
    };

    sendAddEventRequest = (userId, eventId) => {
        this.props.pendingEventRequest(userId, eventId, async (error, data) => {
            if (error) {
                return;
            }
            alert('request send')
        });
    };

    successEventRequestFinish = (userId, eventId) => {
        this.props.successEventRequest(userId, eventId, async (error, data) => {
            if (error) {
                return;
            }
            this.props.getPendingEventRequest(this.props.userId);
        });
    };

    deleteMyEventRequest = (userId, eventId) => {
        const deleteType = 'pending';
        this.props.deleteRequestEventRequest(userId, eventId, deleteType, async (error, data) => {
            if (error) {
                return;
            }
            this.props.getPendingEventRequest(this.props.userId);
        });
    };

    deleteMyFollow = (userId, eventId) => {
        const deleteType = 'success';
        this.props.deleteRequestEventRequest(userId, eventId, deleteType, async (error, data) => {
            if (error) {
                return;
            }
            this.props.getSuccessEventRequest(this.props.userId);
        });
    };

    render() {
        const {
            eventTab,
            myEvents,
            allEvents,
            myEventPagesCount,
            allEventPagesCount,
            successEvents,
            pendingEvents,
            userId,
        } = this.props;

        let renderData = [];
        let MyEvents = false;
        let AllEvents = false;
        let FollowEvents = false;
        let FollowRequest = false;

        let requestIndicator = '';

        switch (eventTab) {
            case 'AllEvents':
                renderData = allEvents.filter(all => all.userId !== userId);
                AllEvents = true;
                break;
            case 'FollowEvents':
                renderData = successEvents;
                FollowEvents = true;
                break;
            case 'FollowRequest':
                renderData = pendingEvents;
                requestIndicator = pendingEvents.length ? `New request ${pendingEvents.length}` : '';
                FollowRequest = true;
                break;
            default:
                renderData = myEvents;
                MyEvents = true;
                break;
        }
        console.log(renderData);
        return (
            <div>
                {MyEvents && <h1>My Events</h1>}
                {AllEvents && <h1>All Events</h1>}
                {FollowEvents && <h1>Follow Events</h1>}
                {FollowRequest && <h1>Follow Request</h1>}
                {requestIndicator !== '' && <p className="errors">{requestIndicator}</p>}
                {MyEvents && <button className="buttons" onClick={this.handleClickAddEvent}>Add event</button>}
                {renderData.map(ev => <>
                    <div key={ev._id} className="eventsContainer">
                        <div>
                            {ev.image.map(i => <img
                                key={i}
                                width={180}
                                src={`http://localhost:4000/eventImage/folder_${ev._id}/${i}`}
                                alt="image"/>)}
                        </div>
                        <div>
                            <span>Email</span>
                            <p>{ev.userId.email}</p>
                            <span>Title</span>
                            <p>{ev.title}</p>
                            <span>Description</span>
                            <p>{ev.description}</p>
                            <span>Limit</span>
                            <p>{ev.limit}</p>
                            <span>Status</span>
                            <p>{ev.status}</p>
                            <span>EventId</span>
                            <p>{ev._id}</p>
                            {AllEvents && <Fragment>
                             <button
                                onClick={() => this.sendAddEventRequest(userId, ev._id)}
                                className="buttons"
                            >Add to my page</button>
                                {/*{ev.members.some(m => m.userId === userId) ? <button*/}
                                {/*    onClick={() => this.sendAddEventRequest(userId, ev._id)}*/}
                                {/*    className="buttons"*/}
                                {/*>Add to my page</button> : <button disabled>This event my followed</button>}*/}
                            </Fragment>}
                            {FollowEvents && <button
                                onClick={() => this.deleteMyFollow(userId, ev._id)}
                                className="buttons"
                            >delete</button>}
                        </div>
                        {MyEvents && <div>
                            <button className="buttons" onClick={() => this.deleteEvent(userId, ev._id)}>delete</button>
                            <button className="buttons" onClick={() => this.editEvent(ev._id)}>edit</button>
                        </div>}
                        {FollowRequest && <div style={{border: 'solid 2px red'}}>
                            <h3>This event wants to subscribe users</h3>
                            {ev.members.filter(f => f.status !== 'success').map(member => <div>
                                <p>{member.email}</p>
                                <p>{member.status}</p>
                                <button
                                    className="buttons"
                                    onClick={() => this.successEventRequestFinish(member.userId, ev._id)}>
                                    follow
                                </button>
                                <button
                                    className="buttons"
                                    onClick={() => this.deleteMyEventRequest(member.userId, ev._id)}>
                                    delete
                                </button>
                            </div>)}
                        </div>}
                    </div>
                    <hr/>
                </>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    singleEvent: state.events.singleEvent,
    myEvents: state.events.myEvents,
    myEventPagesCount: state.events.myEventPagesCount,
    allEvents: state.events.allEvents,
    allEventPagesCount: state.events.allEventPagesCount,
    successEvents: state.events.successEvents,
    pendingEvents: state.events.pendingEvents,
});
const mapDispatchToProps = {
    deleteEventRequest,
    allMyEventRequest,
    singleEventRequest,
    allEventRequest,
    pendingEventRequest,
    successEventRequest,
    deleteRequestEventRequest,
    getSuccessEventRequest,
    getPendingEventRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(MyEvents));

export default Container;
