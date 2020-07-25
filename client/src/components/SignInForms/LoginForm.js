import React, { useState } from "react";
import { Input } from "../FormElements";
import SubmitBtn from "../SubmitBtn";

function LoginForm() {
    const [user, setUser] = useState();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // remove before production
        const submittedUser = JSON.stringify(user);
        console.log(submittedUser)

        // ! Enter Passport.js functionality to verify login credentials

    }

    return (
        <form>
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
            <p>Or, <a href="#">create account</a></p>
            <SubmitBtn
                text="Login"
                name="login"
                onClick={handleFormSubmit}
            />
        </form>
    )
}

export default LoginForm;
