import API from "./API";

const syncDB = () => {
    let newEventData = localStorage.getItem("formData");
    newEventData = JSON.parse(newEventData);

    let deleteEventId = localStorage.getItem("eventId");
    deleteEventId = JSON.parse(deleteEventId);

    if (newEventData) {
        API.saveEvent(newEventData)
            .then(res => localStorage.removeItem("formData"))
            .catch(err => console.log(err));
    }

    if (deleteEventId) {
        API.deleteEvent(deleteEventId)
            .then(res => localStorage.removeItem("eventId"))
            .catch(err => console.log(err));
    }
}

export default syncDB;