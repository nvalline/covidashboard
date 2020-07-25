import React from "react";
import RegisterForm from "../SignInForms/RegisterForm";

function Home() {
    return (
        <div className="container">
            {/* remove before production */}
            <p>client page</p>

            {/* Insert Page Elements */}
            <RegisterForm />
        </div>
    )
}

export default Home;