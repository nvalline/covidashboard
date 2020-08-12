import React, { useState } from "react";

const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
    const [notificationState, setNotificationState] = useState({});

    return (
        <NotificationContext.Provider value={[notificationState, setNotificationState]}>
            {children}
        </NotificationContext.Provider>
    )
};

export { NotificationContext, NotificationProvider };