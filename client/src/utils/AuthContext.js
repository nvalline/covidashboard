import React, { useState, useEffect } from "react";

const AuthContext = React.createContext([{}, () => { }]);

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false });

    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };