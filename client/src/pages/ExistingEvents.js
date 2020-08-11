import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import { AuthContext } from "../utils/AuthContext";
import API from "../utils/API";

function ExistingEvents() {
  // Setting our component's initial state
  const [events, setEvents] = useState([]);
  const [authState] = useContext(AuthContext);

  // Load all events and store them with setEvents
  useEffect(() => {
    function loadUserEvents() {
      API.getEventsByUser(authState.userId)
        .then(res => {
          setEvents(res.data);
        })
        .catch(err => console.log(err));
    }

    loadUserEvents();
  }, [authState]);

  // Loads all events and sets them to events
  function loadEvents() {
    API.getEventsByUser(authState.userId)
      .then(res => {
        setEvents(res.data);
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
      {events.length === 0 ? (
        <div className="text-center mb-5">
          <p>No events added yet.</p>
        </div>
      ) : (
        events.map(event => (
          <Event
            key={event._id}
            title={event.title}
            date={event.date}
            notes={event.notes}
            noticeDate={event.noticeDate}
            button={() => (
              <button
                onClick={() => deleteEvent(event._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            )}
          />
        ))
      )}
      <div className="text-center mt-5">
        <Link to="/new" className="btn btn-lg btn-primary">
          + Add A New Event
        </Link>
      </div>
    </div>
  );
}

export default ExistingEvents;
