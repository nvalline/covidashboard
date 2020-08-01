import React from "react";

function Event(props) {
  return (
    <div className="event row align-items-baseline">
      <p className="ml-3">{props.title}</p>
      <p className="ml-3">{props.date}</p>
      <props.button />
    </div>
  );
}

export default Event;
