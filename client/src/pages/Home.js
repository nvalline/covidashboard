import React from "react";
import Event from "../components/Event";

// event placeholders / replace these with database events
let tempEvents = [
  {
    id: "1",
    value: false,
    title: "Title of event",
    date: "07/27/2020",
  },
  {
    id: "2",
    value: false,
    title: "Title of event",
    date: "07/27/2020",
  },
  {
    id: "3",
    value: false,
    title: "Title of event",
    date: "07/27/2020",
  },
];

function Home() {
  return (
    <div className="container">
      <div className="events m-3">
        {/* {tempEvents.map(event => (
          <Event
            key={event.id}
            value={event.value}
            title={event.title}
            date={event.date}
          />
        ))} */}
      </div>
    </div>
  );
}

export default Home;
