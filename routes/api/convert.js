const router = require("express").Router();
const Papa = require("papaparse");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// Matches with "/api/convert"
router.get("/states", (req, res) => {
    axios.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv")
    .then(res => {
        let converted = Papa.parse(res.data, { header: true });
        let latest = converted.data.slice(converted.data.length - 55);
        let states = [];
        for (let i = 0; i < latest.length; i++) {
            states.push(latest[i])
        }
        
        saveConvertedData(states, "states");
    })
    .catch(err => console.log(err));
})

router.get("/counties", (req, res) => {
    axios.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv")
    .then(res => {
        let converted = Papa.parse(res.data, { header: true });
        let latest = converted.data.slice(converted.data.length - 3221);
        let counties = [];
        for (let i = 0; i < latest.length; i++) {
            if (latest[i].county !== counties[i]) {
                counties.push(latest[i])
            }
        }
        saveConvertedData(counties, "counties");
    })
    .catch(err => console.log(err));
})

function saveConvertedData(data, name) {
    let outputLocation = path.resolve(__dirname, "../../client/src/components/", `current-${name}-data.json`);
    fs.writeFile(outputLocation, JSON.stringify(data, null, 4), function(err) {
        console.log("Data Refreshed!")
    });
}

module.exports = router;