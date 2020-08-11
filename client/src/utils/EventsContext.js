import React, { useState } from "react";
import DB from "./tiny-idb";
import suspender from "./suspender";
import API from "../utils/API";

async function setUpDatabase() {
    await DB.createDB("ContactTracingDb", 1, [{
        name: "events",
        config: { autoIncrement: true }
    }]);
};

const EventsContext = React.createContext();

const fetchMDB = (id) => {
    API.getEvent(id)
        .then(res => {
            console.log("RES:", res)
        })
        .catch(err => console.log("NO FILE:", err));
}

const syncDbs = async (idbData) => {
    const IDB = idbData;
    let eventId = IDB[IDB.length - 1];
    eventId = eventId._id;
    console.log("SYNC IDB:", IDB)
    console.log("IDB ID:", eventId)
    const MDB = await fetchMDB(eventId);
    console.log("SYNC MDB:", MDB)
}

async function getAllEvents() {
    await setUpDatabase();

    let db = await DB.openDB("ContactTracingDb", 1);

    const eventStore = await DB.transaction(db, ["events"], "readwrite").getStore("events");

    let allEvents = await DB.getAllObjectData(eventStore);

    allEvents = allEvents.pop();

    syncDbs(allEvents);

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
