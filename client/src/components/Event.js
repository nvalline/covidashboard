import React from "react";
import moment from "moment-timezone";

function Event(props) {
  return (
    <div className="event align-items-baseline border pl-3 pr-3 mt-3 mb-3 rounded">
      <div className="row p-3 align-items-center">
        <h3 className=""><strong>{props.title}</strong></h3>
        <p className="p-3 align-center ml-auto">Date Logged: {moment.utc(props.date).format("MMM DD, YYYY [at] h:mm a")}</p>
        <props.button />
      </div>
      <p className="pb-3">{props.notes}</p>
    </div>
  );
}

export default Event;
