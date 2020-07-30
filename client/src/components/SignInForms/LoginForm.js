import React, { useState, useContext } from "react";
import { Input } from "../FormElements";
import SubmitBtn from "../SubmitBtn";
import axios from "axios";
import { useNotification } from "../../utils/NotificationContext";

function LoginForm(props) {
    const [user, setUser] = useState();
    const [success_msg, setSuccess_msg] = useContext(useNotification);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const userData = user;
        console.log(userData)

        axios.post("/auth/login", userData)
            .then(res => {
                console.log("RES:", res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="mt-5">
            <form className="mb-5">
                <h4>Log In</h4>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleInputChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
                <p>Or, <a href="/register">create account</a></p>
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
