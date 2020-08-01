import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Input } from "../FormElements";
import SubmitBtn from "../SubmitBtn";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NotificationContext } from "../../utils/NotificationContext";

import ErrorMessages from "./ErrorMessages";
import SuccessMessage from "./SuccessMessage";

function LoginForm() {
    let history = useHistory();
    const [user, setUser] = useState({ email: "", password: "" });
    const [notificationState, setNotificationState] = useContext(NotificationContext);

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
                    history.push("/dashboard");
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
