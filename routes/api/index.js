const router = require("express").Router();
const eventRoutes = require("./events");
const currentData = require("./current");

// Event routes
router.use("/events", eventRoutes);
router.use("/current", currentData);

module.exports = router;
