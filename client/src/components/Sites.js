import React from "react";

function Sites(props) {

    if (!props.state) {
        return (
            <div className="mt-5">
                <p>Select a state above to see official testing locations.</p>
            </div>
        )
    } else {
        return (
            <div className="mt-5">
                <a href={props.sites} target="_blank" rel="noopener noreferrer" >
                    <h1 style={{color: "#75ABDE"}}>{props.state}: Official testing locations →</h1>
                </a>
            </div>
        )
    }

}

export default Sites;