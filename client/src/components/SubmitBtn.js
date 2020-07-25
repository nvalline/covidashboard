import React from "react";

function SubmitBtn(props) {
    return (
        <button className="submitBtn" {...props} type="button">
            {props.text}
        </button>
    )
}

export default SubmitBtn;
