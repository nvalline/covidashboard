const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./user");
const currentData = require("./current");

// Event routes
router.use("/events", eventRoutes);
router.use("/current", currentData);
router.use("/user", userRoutes);

module.exports = router;
