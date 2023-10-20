const {
  addMessage,
  getAllMessages,
} = require("../controller/messagesController");

const router = require("express").Router();
router.post("/addmessage", addMessage);
router.post("/getallmessages", getAllMessages);

module.exports = router;
