import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import API from "../utils/API";

function ExistingEvents() {
  // Setting our component's initial state
  const [events, setEvents] = useState([]);

  // Load all books and store them with setEvents
  useEffect(() => {
    loadEvents();
  }, []);

  // Loads all books and sets them to books
  function loadEvents() {
    API.getEvents()
      .then(res => {
        setEvents(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteEvent(id) {
    API.deleteEvent(id)
      .then(res => loadEvents())
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      {events.map(event => (
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

        // <div className="event row align-items-baseline">
        //   <input type="checkbox" id={event._id} value={event.value}></input>
        //   <p className="ml-3">{event.title}</p>
        //   <p className="ml-3">{event.date}</p>
        //   <button
        //     onClick={() => deleteEvent(event._id)}
        //     className="btn btn-danger text-white float-right"
        //   >
        //     Delete
        //   </button>
        // </div>
      ))}
    </div>
  );
}

export default ExistingEvents;
