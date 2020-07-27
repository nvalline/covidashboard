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
                <a href={props.sites}>
                    <h1>{props.state}: Official testing locations →</h1>
                </a>
            </div>
        )
    }

}

export default Sites;