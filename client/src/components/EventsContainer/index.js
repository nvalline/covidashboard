import React from "react";
import Event from "../Event";

function EventsContainer(props) {
  return (
    <React.Fragment>
      {props.events.map(event => (
        <Event
          key={event._id}
          title={event.title}
          date={event.date}
          button={() => (
            <button
              onClick={() => deleteEvent(event._id)}
              className="btn btn-danger text-white float-right"
            >
              Delete
            </button>
          )}
        />
      ))}
    </React.Fragment>
  );
}

export default EventsContainer;
