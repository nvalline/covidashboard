import React, { useState } from "react";

const OfflineContext = React.createContext();

const OfflineProvider = ({ children }) => {
    const [offlineState, setOfflineState] = useState();

    return (
        <OfflineContext.Provider value={[offlineState, setOfflineState]}>
            {children}
        </OfflineContext.Provider>
    )
};

export { OfflineContext, OfflineProvider };