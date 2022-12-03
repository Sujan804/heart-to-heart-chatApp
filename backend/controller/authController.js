const formidable = require("formidable");
const validator = require("validator");
const fs = require("fs");
const bcrypt = require("bcrypt");

const userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { userName, email, password, confirmPassword } = fields;
    const registeredUser = require("../models/authModel");
    const { image } = files;
    const error = [];

    //Checking Error

    if (!userName) {
      error.push("Please provides your user name");
    }
    if (!email) error.push("Please provide an Email");
    if (email && validator.isEmail(email))
      error.push("Please provide valid Email");
    if (!password) error.push("Please provide password");
    if (!confirmPassword) error.push("Please confirm your password");
    if (password && confirmPassword && password !== confirmPassword)
      error.push("Password not matched");
    if (Object.keys(files).length === 0) {
      error.push("Please provide a profile picture");
    }

    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const getImageName = files.image.name;
      const randNumber = new Date().getTime().toString(36);
      const newImageName = getImageName + randNumber;
      files.image.name = newImageName;

      const newPath =
        __dirname + `../../frontend/public/image/${files.image.name}`;

      try {
        const checkUser = await registeredUser.findOne({ email: email });
        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Your  Email already Exist"],
            },
          });
        } else {
          fs.copyFile(files.image.path, newPath, async (error) => {
            if (!error) {
              const userCreate = await registeredUser.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.name,
              });

              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  userName: userCreate.userName,
                  image: userCreate.image,
                  registerTime: userCreate.createAt,
                },
                process.env.SECRET,
                {
                  expiresIn: process.env.TOKEN_EXP,
                }
              );

              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                ),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Your register successfull",
                token,
              });
            } else {
              res.status(404).json({
                error: {
                  errorMessage: ["Internal server error"],
                },
              });
            }
          });
        }
      } catch (err) {
        res.status(404).json({
          error: {
            errorMessage: ["Internal server error"],
          },
        });
      }
    }
  });
};

const userLogin = async (req, res) => {
  const error = [];

  const { email, password } = req.body;
  if (!email) {
    error.push("Please provide your email");
  }
  if (!password) {
    error.push("Please provide your password");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Please provide your valid email");
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      const checkUser = await registeredUser
        .findOne({ email: email })
        .select("+password");

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createAt,
            },
            process.env.SECRET,
            {
              expiresIn: process.env.TOKEN_EXP,
            }
          );

          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
            ),
          };

          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Your login successfull",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Your password not valid"],
            },
          });
        }
      }
    } catch (error) {
      res.status(404).json({
        error: {
          errorMessage: ["Internal server error"],
        },
      });
    }
  }
};

const userLogout = (res, req) => {
  res.status(404).cookie("authToken", "").json({
    success: true,
  });
};
module.exports = { userRegister, userLogin, userLogout };
