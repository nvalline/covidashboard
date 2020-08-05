import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Input, Textarea } from "../components/FormElements";
import SubmitBtn from "../components/SubmitBtn";
import API from "../utils/API";

function NewEvent() {
  // Setting our component's initial state
  const [formObject, setFormObject] = useState({});
  const [redirect, setRedirect] = useState("");

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    console.log(formObject);
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
      })
        .then(res => setRedirect("/events"))
        .catch(err => console.log(err));
    }
  }
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    return (
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
    );
  }
}

export default NewEvent;
