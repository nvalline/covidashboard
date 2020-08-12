import React, { useState } from "react";

const EventsContext = React.createContext();

const EventsProvider = ({ children }) => {

    const [events, setEvents] = useState();

    return (
        <EventsContext.Provider value={[events, setEvents]}>
            {children}
        </EventsContext.Provider>
    )
}

export { EventsContext, EventsProvider };
