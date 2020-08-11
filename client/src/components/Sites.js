import React from "react";

function Sites(props) {
    return (
        <div className="mt-5">
            <a href={props.sites} target="_blank" rel="noopener noreferrer" >
                <h1 style={{color: "#75ABDE"}}>{props.state}: Official Testing Locations →</h1>
            </a>
        </div>
    )

}

export default Sites;