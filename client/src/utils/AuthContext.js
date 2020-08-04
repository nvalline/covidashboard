import React, { useState, useEffect } from "react";

const AuthContext = React.createContext([{}, () => { }]);

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        let isAuthenticated = localStorage.getItem("isAuthenticated");
        isAuthenticated = JSON.parse(isAuthenticated);
        console.log("LOCAL:", JSON.parse(isAuthenticated))

        if (isAuthenticated && userId) {
            setAuthState({ isAuthenticated, userId });
        } else {
            setAuthState({ isAuthenticated: false, userId: null });
        }
    }, []);

    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };