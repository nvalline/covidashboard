import DB from "./tiny-idb";

export default {
    updateIDB: async function (newIdbData) {
        const db = await DB.openDB("ContactTracingDb", 1);

        const eventStore = await DB.transaction(db, ["events"], "readwrite").getStore("events");

        const newIdbEvents = await DB.addObjectData(eventStore, newIdbData)

        return newIdbEvents;
    }
}