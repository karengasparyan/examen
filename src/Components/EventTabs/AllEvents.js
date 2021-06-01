import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {allEventRequest} from "../../store/actions/events";

class AllEvents extends Component {

    componentDidMount() {
        this.props.allEventRequest(null, 1);
    }

    render() {
        const {allEvents, allEventPagesCount} = this.props;

        return (
            <div>
                <h1>All Events</h1>
                {allEvents?.map(ev => <Fragment key={ev._id}>
                    <div className="eventsContainer">
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
                        </div>
                    </div>
                    <button className="buttons">follow</button>
                    <hr/>
                </Fragment>)}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    allEvents: state.events.allEvents,
    allEventPagesCount: state.events.allEventPagesCount,
});
const mapDispatchToProps = {
    allEventRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllEvents);

export default Container;
