import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Input } from "../FormElements";
import SubmitBtn from "../SubmitBtn";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NotificationContext } from "../../utils/NotificationContext";
import { AuthContext } from "../../utils/AuthContext";

import ErrorMessages from "./ErrorMessages";
import SuccessMessage from "./SuccessMessage";

function LoginForm() {
    const [authState, setAuthState] = useContext(AuthContext);
    const [notificationState, setNotificationState] = useContext(NotificationContext);

    let history = useHistory();
    const [user, setUser] = useState({ email: "", password: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const userData = user;

        axios.post("/auth/login", userData)
            .then(res => {
                if (res.data.auth) {
                    const newState = { isAuthenticated: true, userId: res.data.userId };
                    setAuthState(newState);
                    history.push("/dashboard");
                    const userId = res.data.userId;
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("userId", userId);
                } else {
                    const loginMsg = res.data.message;
                    setNotificationState({ msg: loginMsg });
                }
            })
            .catch(err => {
                console.log(err)
            })

        setUser({ email: "", password: "" });
    }

    return (
        <div className="mt-5">
            <form className="mb-5">
                <h4>Log In</h4>
                {notificationState.fromReg && <SuccessMessage success={notificationState} />}
                {notificationState.msg && <ErrorMessages error={notificationState} />}
                <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    value={user.email}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={user.password}
                />
                <p>Or, <Link to="/register">create account</Link></p>
                <SubmitBtn
                    text="Login"
                    name="login"
                    onClick={handleFormSubmit}
                />
            </form>
        </div>
    )
}

export default LoginForm;
