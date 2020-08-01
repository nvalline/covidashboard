import React, { useState } from "react";
import { Select } from "../components/FormElements";
import SubmitBtn from "../components/SubmitBtn";
import Sites from "../components/Sites";
import testingSites from "../components/testingSites.json";

function TestingSites() {
    const [state, setState] = useState();
    const [sites, setSites] = useState();

    function handleFormSubmit(event) {
        event.preventDefault();
        
        let selector = document.getElementById("state-selector");
        setState(selector.options[selector.selectedIndex].value);
        setSites(testingSites[selector.options[selector.selectedIndex].value].sites);
    };

    return (
        <div className="container text-center">
            <h1 className="mb-5">Find Testing Locations</h1>
            <h3>Select State</h3>
            <Select />
            <SubmitBtn 
                text="Submit"
                name="submit"
                onClick={handleFormSubmit}
            />
            <Sites state={state} sites={sites} />
        </div>
    )
}

export default TestingSites;