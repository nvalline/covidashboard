import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import API from "../utils/API";
import Symptoms from "../components/Symptoms";
import moment from "moment-timezone";

function Home() {
  const [stateData, setStateData] = useState({});
  const [userEmail, setUserEmail] = useState();
  const [authState] = useContext(AuthContext);
  const [userState, setUserState] = useState();
  const [userCounty, setUserCounty] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.getUser(authState.userId)
      .then(res => {
        let county = res.data.county;
        setUserCounty(county);

        let email = res.data.email;
        setUserEmail(email);

        setUserState(res.data.state);
        let state = res.data.state.toLowerCase();
        axios.get(`/api/current/${state}`)
          .then(res2 => {
            console.log(res2)
            setStateData(res2.data);
            getEvents();
          })          
      })
      .catch(err => console.log(err));

    function getEvents() {
      API.getEventsByUser(authState.userId)
        .then(res => {
          setEvents(res.data);
        })
        .catch(err => console.log(err));
    }

  }, [authState.userId])

  

  return (
    <div className="container-fluid">
      <p className="text-center">{userEmail} / {userState} / {userCounty} County</p>
      <div className="events m-3">
          <div className="text-center">
            <div className="row">
            </div>
            <div className="row">
              {/* Trend */}
              <div id="trend" className="col section">
                <h4 className="section-title">Trend</h4>
              </div>
              {/* Cases */}
              <div id="cases" className="col section">
                <h4 className="section-title">Cases</h4>
                <div className="row">
                  <div className="col">
                    <p>Total</p>
                    <p className="data-result">{stateData.positive === undefined ? "N/A" : stateData.positive.toLocaleString()}</p>
                  </div>
                  <div className="col">
                    <p>New</p>
                    <p className="data-result">{stateData.positiveIncrease}</p>
                  </div>
                </div>
                <p>{userCounty} County: (Get County Data)</p>
              </div>
            </div>

            <div className="row">
              {/* Symptoms */}
              <div id="symptoms" className="col section">
                <h4 className="section-title">Symptoms</h4>
                <Symptoms />
              </div>
              {/* Events */}
              <div id="events" className="col section">
                <h4 className="section-title">Events</h4>
                  { 
                  events.length === 0 
                  ? (
                    <div className="text-center mb-5">
                      <p>No events added yet.</p>
                      <br></br>
                      <Link to="/new" className="btn btn-lg btn-primary">
                        + Add A New Event
                      </Link>
                    </div>
                  ) 
                  : (
                    events.map(event => (
                    <div className="row dash-event">
                      <Link to="/events"><p className="dash-event-title" style={{color: "black"}}>{event.title}</p></Link>
                      <p className="dash-event-date">{moment(event.date).calendar()}</p>
                    </div>
                    ))
                  )
                }
                <Link to="/new" className="btn btn-lg btn-primary">
                  + Add A New Event
                </Link>
              </div>
            </div>
          </div>
        {/* {tempEvents.map(event => (
                    <Event key={event.id} value={event.value} title={event.title} date={event.date} />
                ))} */}
      </div>
    </div>
  );
}

export default Home;
