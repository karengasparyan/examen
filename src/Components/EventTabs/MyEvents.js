import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {allMyEventRequest, deleteEventRequest, singleEventRequest} from "../../store/actions/events";
import {withRouter} from "react-router-dom";
import memoizeOne from "memoize-one";

class MyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const {userId} = this.props;
        this.props.allMyEventRequest(userId, null, 1);
    }

    deleteEvent = (userId, eventId) => {
        this.props.deleteEventRequest(userId, eventId, async (error, data) => {
            if (error) {

                return;
            }
            this.props.allMyEventRequest(userId, null, 1);
        });
    };

    editEvent = (ev) => {
        this.props.singleEventRequest(ev, async (error, data) => {
            if (error) {
                return;
            }
            this.props.history.push(`/edit-event/${ev}`)
        });
    };

    render() {
        const {myEvents, myEventPagesCount, userId} = this.props;

        return (
            <div>
                <h1>My Events</h1>
                {myEvents.map(ev => <>
                    <div className="eventsContainer">
                        <div>
                            {ev.image.map(i => <img
                                width={200}
                                src={`http://localhost:4000/eventImage/folder_${ev._id}/${i}`}
                                alt="image"/>)}
                        </div>
                        <div>
                            <p>{ev.title}</p>
                            <p>{ev.description}</p>
                            <p>{ev.limit}</p>
                            <p>{ev.status}</p>
                            <p>{ev.description}</p>
                        </div>
                        <div>
                            <button onClick={() => this.deleteEvent(userId, ev._id)}>delete</button>
                            <button onClick={() => this.editEvent(ev._id)}>edit</button>
                        </div>
                    </div>
                </>)}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    singleEvent: state.events.singleEvent,
    myEvents: state.events.myEvents,
    myEventPagesCount: state.events.myEventPagesCount,
});
const mapDispatchToProps = {
    deleteEventRequest,
    allMyEventRequest,
    singleEventRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(MyEvents));

export default Container;
