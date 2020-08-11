import React from "react";

function Disclaimer() {
  return (
    <div className="about text-center">
      <h5>Disclaimer</h5>
      <p>
        The purpose of this application is to provide an easily-accesible,
        personalized snapshot of available information and resources on related
        to the COVID-19 pandemic.
      </p>
      <p>
        Information collected during user creation is stored to present
        personalized metrics realted to COVID-19 and to ensure appropriate
        authorization to create, view, or delete events of potential SARS-CoV-2
        exposure. Event data is not stored persistently. Once a user deletes an
        event all related information is deleted from the events database.
      </p>
      <p>
        The resources and information provided is intended for educational
        purposes. If you suspect that you have been exposed to SARS-CoV-2 it is
        highly encouraged you seek medical attention.
      </p>
    </div>
  );
}

export default Disclaimer;
