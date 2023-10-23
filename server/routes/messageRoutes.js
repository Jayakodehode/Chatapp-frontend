const {
  addMessage,
  getAllMessages,
} = require("../controller/messagesController");

const router = require("express").Router();
router.post("/addmessage", addMessage);
router.post("/getmsg", getAllMessages);

module.exports = router;
