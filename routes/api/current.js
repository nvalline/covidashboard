const router = require("express").Router();
const axios = require("axios");

// Matches with "/api/events/:id"
router.get("/:state", (req, res) => {
      axios.get("https://covidtracking.com/api/v1/states/"
      + req.params.state
      + "/current.json")
      .then(response => {
          res.json(response.data);
        })
        .catch(e => console.log(e));
    })


module.exports = router;