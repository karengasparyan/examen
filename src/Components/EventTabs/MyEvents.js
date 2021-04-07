import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {
    allEventRequest,
    allMyEventRequest,
    deleteEventRequest, getPendingEventRequest,
    pendingEventRequest,
    singleEventRequest
} from "../../store/actions/events";
import {withRouter} from "react-router-dom";
import memoizeOne from "memoize-one";

class MyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const {userId, eventTab} = this.props;
        this.props.allMyEventRequest(userId, null, 1);
        if (eventTab === 'AllEvents') {
            this.props.allEventRequest(null, 1);
        }
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

    addEvent = (userId, eventId) => {
        this.props.pendingEventRequest(userId, eventId)
    };

    render() {
        const {
            eventTab,
            myEvents,
            allEvents,
            myEventPagesCount,
            allEventPagesCount,
            pendingEvents,
            userId,
        } = this.props;

        let renderData = [];
        let MyEvents = false;
        let AllEvents = false;
        let FollowEvents = false;
        let FollowRequest = false;

        switch (eventTab) {
            case 'AllEvents':
                renderData = allEvents;
                AllEvents = true;
                break;
            case 'FollowEvents':
                renderData = [];
                FollowEvents = true;
                break;
            case 'FollowRequest':
                renderData = pendingEvents;
                console.log(pendingEvents)
                FollowRequest = true;
                break;
            default:
                renderData = myEvents;
                MyEvents = true;
                break;
        }

        return (
            <div>
                {MyEvents && <h1>My Events</h1>}
                {AllEvents && <h1>All Events</h1>}
                {FollowEvents && <h1>Follow Events</h1>}
                {FollowRequest && <h1>Follow Request</h1>}
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
                            <span>Title</span>
                            <p>{ev.title}</p>
                            <span>Description</span>
                            <p>{ev.description}</p>
                            <span>Limit</span>
                            <p>{ev.limit}</p>
                            <span>Status</span>
                            <p>{ev.status}</p>
                            {AllEvents && <button
                                onClick={() => this.addEvent(userId, ev._id)}
                                className="buttons"
                            >Add to my events</button>}
                        </div>
                        {MyEvents && <div>
                            <button className="buttons" onClick={() => this.deleteEvent(userId, ev._id)}>delete</button>
                            <button className="buttons" onClick={() => this.editEvent(ev._id)}>edit</button>
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
    pendingEvents: state.events.pendingEvents,
});
const mapDispatchToProps = {
    deleteEventRequest,
    allMyEventRequest,
    singleEventRequest,
    allEventRequest,
    pendingEventRequest,
    getPendingEventRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(MyEvents));

export default Container;
