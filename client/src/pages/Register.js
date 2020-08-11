import React from "react";
import RegisterForm from "../components/SignInForms/RegisterForm";
import About from "../components/About";

function Register() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <About />
                </div>
                <div className="col">
                    <RegisterForm />
                </div>
            </div>
            
            <p className="text-center mt-5">&copy; Copyright 2020</p>
        </div>
    )
}

export default Register;