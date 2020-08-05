import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import API from "../utils/API";

function ExistingEvents() {
  // Setting our component's initial state
  const [events, setEvents] = useState([]);

  // Load all events and store them with setEvents
  useEffect(() => {
    loadEvents();
  }, []);

  // Loads all events and sets them to events
  function loadEvents() {
    API.getEvents()
      .then(res => {
        setEvents(res.data)
      })
      .catch(err => console.log(err));
  }

  // Deletes an evnt from the database with a given id, then reloads events from the db
  function deleteEvent(id) {
    API.deleteEvent(id)
      .then(res => loadEvents())
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <h2 className="text-center mt-3 mb-5">My Tracked Events</h2>
      {events.length === 0 ? 
        <div className="text-center mb-5">
          <p>No events added yet.</p>
          <br></br>
          <Link to="/new" className="btn btn-primary">+ Add A New Event</Link>
        </div>
        : events.map(event => (
          <Event
            key={event._id}
            title={event.title}
            date={event.date}
            notes={event.notes}
            button={() => (
              <button
                onClick={() => deleteEvent(event._id)}
                className="btn btn-danger text-white float-right ml-3" style={{height:"40px"}}
              >
                <i className="fa fa-trash"></i>
              </button>
            )}
          />
        ))}
    </div>
  );
}

export default ExistingEvents;
