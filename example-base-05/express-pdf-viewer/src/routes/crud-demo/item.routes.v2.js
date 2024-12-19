const express = require("express");
const router = express.Router();
const itemController = require("./item.controller.v2");

router.get("/", itemController.getAllItems);
router.post("/add", itemController.addItem);
router.post("/update", itemController.updateItem);
router.post("/delete", itemController.deleteItem);

module.exports = router;
