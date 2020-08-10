import React, { useState } from "react";
import DB from "./tiny-idb";
import UniqueString from "./unique-string";
import suspender from "./suspender";

const uid = new UniqueString();

async function setUpDatabase() {
    "use strict";

    await DB.createDB("ContactTracingDb", 1, [{
        name: "events",
        config: { autoIncrement: true }
    }]);
};

const EventsContext = React.createContext();

async function getAllEvents() {
    await setUpDatabase();

    let db = await DB.openDB("ContactTracingDb", 1);

    const eventStore = await DB.transaction(db, ["events"], "readwrite").getStore("events");


    let allEvents = await DB.getAllObjectData(eventStore);
    allEvents = allEvents.pop();
    return allEvents;
}

const resource = suspender(getAllEvents());

const EventsProvider = ({ children }) => {
    const userEvents = resource.data.read();

    const [events, setEvents] = useState(userEvents);

    return (
        <EventsContext.Provider value={[events, setEvents]}>
            {children}
        </EventsContext.Provider>
    )
}

export { EventsContext, EventsProvider };
