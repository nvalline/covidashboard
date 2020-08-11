import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Input, Textarea } from "../components/FormElements";
import { AuthContext } from "../utils/AuthContext";
import SubmitBtn from "../components/SubmitBtn";
import API from "../utils/API";
import IDB from "../utils/IDB";
import moment from "moment-timezone";

function NewEvent() {
  const [authState] = useContext(AuthContext);

  // Setting our component's initial state
  const [formObject, setFormObject] = useState({});
  const [redirect, setRedirect] = useState("");

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveEvent method to save the event data
  // Then reload events from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.date && formObject.title) {
      API.saveEvent({
        date: formObject.date,
        title: formObject.title,
        notes: formObject.notes,
        noticeDate: moment(formObject.date).add(14, "d")._d,
        user: authState.userId,
      })
        .then(res => {
          newIDB();
          setRedirect("/events");
        })
        .catch(err => console.log(err));
    }
  }

  function newIDB() {
    API.getEventsByUser(authState.userId)
      .then(res => {
        IDB.updateIDB(res.data);
      })
      .catch(err => console.log(err));
  }

  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    return (
      <div className="mm-15">
        <div className="container">
          <h3 className="text-center mt-3">Add New Contact Event</h3>
          <Input
            label="Title"
            type="text"
            name="title"
            placeholder="Event Title..."
            onChange={handleInputChange}
          />
          <Input
            label="Date"
            type="datetime-local"
            name="date"
            onChange={handleInputChange}
          />
          <Textarea
            label="Notes"
            type="text"
            name="notes"
            placeholder="Add some additional notes..."
            onChange={handleInputChange}
          />
          <SubmitBtn text="Submit" name="submit" onClick={handleFormSubmit} />
        </div>
      </div>
    );
  }
}

export default NewEvent;
