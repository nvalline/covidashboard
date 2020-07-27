import React, { useState } from "react";
import { Input, Select } from "../FormElements";
import SubmitBtn from "../SubmitBtn";

function RegisterForm() {
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

        // ! Enter Passport.js functionality to register user

    }

    return (
        <form className="m-3">
            <label>Create Account</label>
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
            <label htmlFor="state">Select Your State:</label>
            <Select
                name="state"
                id="state"
                onChange={handleInputChange}
            />
            <Input
                type="text"
                name="county"
                placeholder="County"
                onChange={handleInputChange}
            />
            <p>Or, <a href="/login">login</a></p>
            <SubmitBtn
                text="Sign Up"
                name="signUp"
                onClick={handleFormSubmit}
            />
        </form>
    )
}

export default RegisterForm;
