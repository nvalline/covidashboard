import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../utils/AuthContext";
import CountySelect from "../components/CountySelect";
import StateSelect from "../components/StateSelect";
import SubmitBtn from "../components/SubmitBtn";
import API from "../utils/API";
import { toast } from "react-toastify";

function Settings() {
  const [authState] = useContext(AuthContext);
  const [newUserState, setNewUserState] = useState();
  const [newUserCounty, setNewUserCounty] = useState();

  useEffect(() => {
    API.getUser(authState.userId)
      .then(res => {
        let state = res.data.state;
        let county = res.data.county;
        setNewUserCounty(county);
        setNewUserState(state);

        let stateSelector = document.getElementById("state");
        selectItemByValue(stateSelector, state)

        let countySelector = document.getElementById("county");
        countySelector.value = county;
      })
      .catch(err => console.log(err));

  }, [authState.userId])

  function selectItemByValue(elmnt, value){
    for(var i=0; i < elmnt.options.length; i++)
    {
      if(elmnt.options[i].value === value)
        elmnt.selectedIndex = i;
    }
  }

  function handleStateChange(event) {
    let newState = event.target.options[event.target.selectedIndex].text;
    setNewUserState(newState);
  }
  
  function handleCountyChange(event) {
    let newCounty = event.target.options[event.target.selectedIndex].text;
    setNewUserCounty(newCounty);
  }

  function handleFormSubmit() {
    API.updateUser(authState.userId, newUserState, newUserCounty);
    toast.warn("User updated!");
  }

  return (
    <div className="container">
      <h2 className="text-center mt-3 mb-5">User Settings</h2>
        <div className="row">
          <div className="col">
            <StateSelect
                name="state"
                id="state"
                label="User State:"
                onChange={handleStateChange}
            />
          </div>
          <div className="col">
            <CountySelect
                type="text"
                id="county"
                label="User County:"
                selectedstate={newUserState}
                onChange={handleCountyChange}
            />
          </div>
        </div>
        <div className="text-right p-3">
          <SubmitBtn
                    text="Update"
                    name="update"
                    onClick={handleFormSubmit}
                />
        </div>
      </div>
  );
}

export default Settings;
