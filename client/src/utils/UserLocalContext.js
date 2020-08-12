import React, { useState } from "react";

const UserLocalContext = React.createContext();

const UserLocalProvider = ({ children }) => {

    const [userState, setUserState] = useState();

    return (
        <UserLocalContext.Provider value={[userState, setUserState]}>
            {children}
        </UserLocalContext.Provider>
    )
}

export { UserLocalContext, UserLocalProvider };