const {
  getFriends,
  messageGet,
  messageUploadDB,
  messageSeen,
  ImageMessageSend,
  deliverdMessage,
} = require("../controller/messengerController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/get-friends", authMiddleware, getFriends);
router.post("/send-message", authMiddleware, messageUploadDB);
router.get("/get-message/:id", authMiddleware, messageGet);
router.post("/image-message-send", authMiddleware, ImageMessageSend);
router.post("/seen-message", authMiddleware, messageSeen);
router.post("/delivered-message", authMiddleware, deliverdMessage);

module.exports = router;
