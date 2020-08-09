import React from 'react';

export function Input(props) {
    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <input className="form-control" {...props} />
        </div>
    );
}

export function Textarea(props) {
    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <textarea className="form-control" rows="8" {...props} />
        </div>
    );
}