const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// User routes
router.get("/", userController.index);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router; 