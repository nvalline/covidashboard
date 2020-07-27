import React from "react";
import LoginForm from "../components/SignInForms/LoginForm";
import Symptoms from "../components/Symptoms";

function Login() {
    return (
        <div className="container">
            <LoginForm />
            <Symptoms />
        </div>
    )
}

export default Login;