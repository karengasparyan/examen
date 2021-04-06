import React, {Component} from 'react';
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
                {allEvents?.map(ev => <>
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
                    </div>
                </>)}
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
