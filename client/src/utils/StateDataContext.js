import React, { useState } from "react";

const StateDataContext = React.createContext();

const StateDataProvider = ({ children }) => {

    const [stateData, setStateData] = useState({});

    return (
        <StateDataContext.Provider value={[stateData, setStateData]}>
            {children}
        </StateDataContext.Provider>
    )
}

export { StateDataContext, StateDataProvider };