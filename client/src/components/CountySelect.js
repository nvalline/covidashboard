import React, { useState, useEffect } from "react";
import abbr from "./abbrvStates.json";
import counties from "./current-counties-data.json";

function CountySelect(props) {

    const [ compState, setCompState ] = useState();
    
    useEffect(() => {
        // find selected state in abbr array
        function search(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].abbreviation === nameKey) {
                    return myArray[i];
                }
            }
        }
        let state = search(props.selectedstate, abbr);

        console.log(props.selectedstate);
        // setState(state.name);
    }, [])
    
    let inc = 0;

    return (
        <div className="form-group">
            <label><strong>{props.label}</strong></label>
            <select className="form-control" id="county-selector" {...props}> 
                
            </select>
        </div>
    );
}

export default CountySelect;