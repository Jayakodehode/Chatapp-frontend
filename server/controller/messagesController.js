const messagesModel = require("../model/messagesModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messagesModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "message added sucessfully" });
    return res.json({ msg: "Failed to add message to database" });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {};
