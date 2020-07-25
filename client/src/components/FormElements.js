import React from 'react';

export function Input(props) {
    return (
        <div>
            <input className="input" {...props} />
        </div>
    );
}

export function Textarea(props) {
    return (
        <div>
            <textarea className="textarea" {...props} />
        </div>
    );
}

export function Select(props) {
    return (
        <div>
            <select className="select" {...props} />
        </div>
    );
}
