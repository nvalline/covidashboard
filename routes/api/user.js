const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

// Matches with "/api/user/"
router.route("/get/:id").get(eventsController.findUser);

// Matches with "/api/user/:id"
router.route("/:id").get(eventsController.findAllByUser);

module.exports = router;
