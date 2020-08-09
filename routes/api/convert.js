const router = require("express").Router();
const Papa = require("papaparse");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

router.get("/counties", (req, res) => {
    axios.get("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv", {headers:{"Content-Type" : "text/csv"}})
    .then(res => {
        console.log(res);
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
    let outputLocation = path.resolve(__dirname, "../../client/src/components/", `nyt-${name}-data.json`);
    fs.writeFile(outputLocation, JSON.stringify(data, null, 4), function(err) {
        console.log("Data Refreshed!")
    });
}

module.exports = router;