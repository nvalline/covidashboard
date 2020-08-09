const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./user");
const currentData = require("./current");
const convertData = require("./convert");

// Event routes
router.use("/events", eventRoutes);
router.use("/current", currentData);
router.use("/user", userRoutes);
router.use("/convert", convertData);

module.exports = router;
