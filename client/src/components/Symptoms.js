import React from "react";

function Symptoms() {
    return (
        <div className="symptoms">
        <h5>COVID-19 symptoms may appear 2-14 days after exposure to the virus:</h5>
            <div className="row">
                <div className="col">
                    <ul>
                        <li>Fever or Chills</li>
                        <li>Shortness of breath or difficulty breathing</li>
                        <li>Fatigue</li>
                        <li>Muscle or body aches</li>
                        <li>Headache</li>
                    </ul>
                </div>
                <div className="col">
                    <ul>
                        <li>New loss of taste or smell</li>
                        <li>Sore Throat</li>
                        <li>Congestion or runny nose</li>
                        <li>Nausea or vomiting</li>
                        <li>Diarrhea</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Symptoms;