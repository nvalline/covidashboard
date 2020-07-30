import React, { useState, useContext } from "react";

const NotificationContext = React.createContext();

export function useNotification() {
    return useContext(NotificationContext);
};

export function NotificationProvider({ children }) {
    const [notificationState, setNotificationState] = useState();

    return (
        <NotificationContext.Provider value={notificationState, setNotificationState}>
            {children}
        </NotificationContext.Provider>
    )
};
