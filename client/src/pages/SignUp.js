import React from "react";
import RegisterForm from "../components/SignInForms/RegisterForm";
import About from "../components/About";

function SignUp() {
    return (
        <div className="container">
            <RegisterForm />
            <About />
            <p className="text-center mt-5">&copy; Copyright 2020</p>
        </div>
    )
}

export default SignUp;