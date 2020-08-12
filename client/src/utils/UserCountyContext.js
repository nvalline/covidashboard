import React, { useState } from "react";

const UserCountyContext = React.createContext();

const UserCountyProvider = ({ children }) => {

    const [userCounty, setUserCounty] = useState();

    return (
        <UserCountyContext.Provider value={[userCounty, setUserCounty]}>
            {children}
        </UserCountyContext.Provider>
    )
}

export { UserCountyContext, UserCountyProvider };

