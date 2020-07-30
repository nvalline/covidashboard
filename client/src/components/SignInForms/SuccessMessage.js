import React from 'react';

function SuccessMessages({ success }) {
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success.msg}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default SuccessMessages;