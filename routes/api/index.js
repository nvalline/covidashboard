const router = require("express").Router();
const eventRoutes = require("./events");

// Event routes
router.use("/events", eventRoutes);

module.exports = router;
