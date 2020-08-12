import React from "react";
import LoginForm from "../components/SignInForms/LoginForm";
import Symptoms from "../components/Symptoms";

function Login() {
    return (
        <div className="mm-15">
            <div className="container">
                <LoginForm />
                <Symptoms />
            </div>
        </div>
    )
}

export default Login;