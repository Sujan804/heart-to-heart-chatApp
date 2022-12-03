const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/user-register", userRegister);
router.post("/user-login", userLogin);
router.post("/user-logout", authMiddleware, userLogout);

module.exports = router;

// const router = require("express").Router();

// router.get("/", (req, res) => {
//   console.log("Auth Route Connected");
//   res.status(200).json({
//     message: "hi from auth",
//   });
// });

// module.exports = router;
