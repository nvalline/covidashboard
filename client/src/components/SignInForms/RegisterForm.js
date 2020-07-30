import React, { useState, useEffect, useContext } from "react";
import { Input, Select } from "../FormElements";
import SubmitBtn from "../SubmitBtn";
import axios from "axios";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { useNotification } from "../../utils/NotificationContext";

import ErrorMessages from "./ErrorMessages";

function RegisterForm() {
    let history = useHistory();
    const [user, setUser] = useState();
    const [errors, setErrors] = useState([]);
    const [hasErrors, SetHasErrors] = useState(false);
    const [success_msg, setSuccess_msg] = useContext(useNotification);

    useEffect(() => {
        if (errors.length > 0) {
            SetHasErrors(true);
        }
    }, [errors]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const userData = user;

        axios.post("/auth/register", userData)
            .then(res => {
                const errors = res.data.errors;

                if (errors === undefined) {
                    setSuccess_msg({ msg: "You are now registered and may log in" });
                    history.push("/login");
                } else if (errors.length > 0) {
                    setErrors(errors);
                }
            })
            .catch(err => {
                console.log(err)
            });
    };


    return (
        <form className="m-3">
            <label>Create Account</label>
            {hasErrors ? errors.map(error => <ErrorMessages error={error} key={uuid()} />) : ''}
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
            <Input
                type="password"
                name="password2"
                placeholder="Confirm Password"
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
