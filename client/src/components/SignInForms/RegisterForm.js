import React, { useState } from "react";
import { Input, Select } from "../FormElements";
import SubmitBtn from "../SubmitBtn";
import axios from "axios";

function RegisterForm() {
    const [user, setUser] = useState();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const userData = user;
        console.log(userData)

        axios
            .post("/api/auth/register", userData)
            .then(res => {
                console.log("RES:", res)
            })
            .catch(err => {
                console.log(err)
            })
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
