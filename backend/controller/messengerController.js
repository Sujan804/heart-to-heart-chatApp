const User = require("../models/authModel");
const formidable = require("formidable");
const messageModel = require("../models/messageModel");
const fs = require("fs");

const getLastMessage = async (myId, fdId) => {
  res.status(200).json({
    Hi: "HHello user! You are logged In",
  });
  const msg = await messageModel
    .findOne({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: myId,
              },
            },
            {
              receverId: {
                $eq: fdId,
              },
            },
          ],
        },
        {
          $and: [
            {
              senderId: { $eq: fdId },
            },
            {
              receverId: {
                $eq: myId,
              },
            },
          ],
        },
      ],
    })
    .sort({
      updateAT: -1,
    });
  return msg;
};

const getFriends = async (req, res) => {
  const myId = req.myId;
  let fnd_msg = [];
  try {
    const friendGet = await User.find({
      _id: {
        $ne: myId,
      },
    });
    for (let i = 0; i < friendGet.length; i++) {
      let lmsg = await getLastMessage(myId, friendGet[i].id);
      fnd_msg = [...fnd_msg, { fndInfo: getFriends[i], msgInfo: lmsg }];
    }
    res.status(200).json({
      success: true,
      friends: fnd_msg,
    });
  } catch (err) {
    res.status(500).json({
      err: {
        errorMessage: "Internal server error",
      },
    });
  }
};
const messageUplodaDB = async (req, res) => {
  const { senderName, receverId, message } = req.body;
  const senderId = req.myId;
  try {
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      receverId: receverId,
      message: {
        text: message,
        image: "",
      },
    });
    res.status(201).json({
      success: true,
      message: insertMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal server error",
      },
    });
  }
};
const messageGet = async (req, res) => {
  const myId = req.myId;
  const fdId = req.params.id;

  try {
    let getAllMessage = await messageModel.find({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: myId,
              },
            },
            {
              receverId: {
                $eq: fdId,
              },
            },
          ],
        },
        {
          $and: [
            {
              senderId: {
                $eq: fdId,
              },
            },
            {
              receverId: {
                $eq: myId,
              },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (error) {
    res.status(500).josn({
      error: {
        errorMessage: "Internal server error",
      },
    });
  }
};

const ImageMessageSend = (req, res) => {
  const senderId = req.myId;
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    const { senderName, receverId, imageName } = fields;
    const newPath = __dirname + `../../frontend/public/image/${imageName}`;
    files.image.name = imageName;

    try {
      fs.copyFile(files.image.path, newPath, async (err) => {
        if (err) {
          res.status(500).json({
            error: {
              errorMessage: "Image upload fail",
            },
          });
        } else {
          const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            receverId: receverId,
            message: {
              text: "",
              image: files.image.name,
            },
          });
          res.status(201).json({
            success: true,
            message: insertMessage,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        error: {
          errorMessage: "Internal server error",
        },
      });
    }
  });
};

const messageSeen = async (req, res) => {
  const messageId = req.body._id;
  await messageModel
    .findByIdAndUpdate(messageId, {
      status: "seen",
    })
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        error: {
          errorMessage: "Internal server Error",
        },
      });
    });
};

const deliverdMessage = async (req, res) => {
  const messageId = req.body._id;

  await messageModel
    .findByIdAndUpdate(messageId, {
      status: "delivared",
    })
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          errorMessage: "Internal Server Error",
        },
      });
    });
};

module.exports = {
  getFriends,
  messageSeen,
  ImageMessageSend,
  messageGet,
  messageUplodaDB,
  deliverdMessage,
};
