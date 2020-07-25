import React from "react";

function SubmitBtn(props) {
    return (
        <button className="btn btn-primary" {...props} type="button">
            {props.text}
        </button>
    )
}

export default SubmitBtn;
