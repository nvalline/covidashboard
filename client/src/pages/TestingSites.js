import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import Sites from "../components/Sites";
import testingSites from "../components/testingSites.json";
import API from "../utils/API";

function TestingSites() {
    const [userState, setUserState] = useState();
    const [sites, setSites] = useState();
    const [authState] = useContext(AuthContext);

    useEffect(() => {
        API.getUser(authState.userId)
          .then(res => {
            let state = res.data.state;
            setSites(testingSites[state].sites)
            state = state.toUpperCase();
            setUserState(state);
          })
          .catch(err => console.log(err));
      }, [authState.userId])

    return (
      <div className="mm-30">
        <div className="container text-center">
            <p className="mt-5">Click the link below to find official testing locations for your state.</p>
            <Sites state={userState} sites={sites} />
        </div>
      </div>
    )
}

export default TestingSites;