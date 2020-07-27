import React from "react";
import { Input, Textarea } from "../components/FormElements";
import SubmitBtn from "../components/SubmitBtn";

function NewEvent() {


    function handleFormSubmit() {

    }

    return (
        <div className="container">
            <h3 className="text-center mt-3">Add New Contact Event</h3> 
            <Input 
                label="Title"
                type="text"
                name="title"
                placeholder="Event Title..."
            />
            <Input 
                label="Date"
                type="date"
                name="date"
                placeholder="Date Of Event..."
            />
            <Textarea 
                label="Notes"
                type="text"
                name="notes"
                placeholder="Add some additional notes..."
            />
            <SubmitBtn 
                text="Submit"
                name="submit"
                onClick={handleFormSubmit}
            />
        </div>
    )
}

export default NewEvent;