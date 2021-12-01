const express = require("express");
const router = express.Router();
const User = require("../models/users.models");
const sendmail = require("../utils/sendmail");
router.post("/", async (req, res) => {
  try {
    const newuser = await User.create(req.body);

    if (req.body.user == "admin") {
      sendmail(
        "paginationcorp@email.com",
        req.body.email,
        `Welcome to ABC system ${req.body.first_name}, ${req.body.last_name}`,
        ` Hi ${req.body.first_name}, Please confirm your email address`,
        `<h1>Welcome to abc corp</h1>`,
        [
          {
            // utf-8 string as an attachment
            filename: "name.txt",
            path: "C:/MASAI SCHOOL/Masai Unit 4/week 3/paginationandemailing/src/name.txt",
          },
        ]
      );
    } else {
      const count = await User.find({ user: { $eq: "admin" } }).count();
      for (var i = 0; i < count; i++) {
        var admin = await User.find({ user: { $eq: "admin" } }).skip(i).limit(1);
        //console.log()
        admin = admin[0].email
        await sendmail(
          "paginationcorp@email.com",
          admin,
          `${req.body.first_name}, ${req.body.last_name} has registered with us`,
          `Please welcome {user.first_name} {user.last_name} ${req.body.first_name}, ${req.body.last_name}`,
          `<h1>New user signed in</h1>`,
          [
            {
              filename: "name.txt",
              path: "C:/MASAI SCHOOL/Masai Unit 4/week 3/paginationandemailing/src/name.txt",
            },
          ]
        );
      }

      sendmail(
        "paginationcorp@email.com",
        req.body.email,
        `Welcome to ABC system ${req.body.first_name}, ${req.body.last_name}`,
        ` Hi ${req.body.first_name}, Please confirm your email address`,
        `<h1>Welcome to abc corp</h1>`,
        [
          {
            filename: "name.txt",
            path: "C:/MASAI SCHOOL/Masai Unit 4/week 3/paginationandemailing/src/name.txt",
          },
        ]
      );
    }

    return res.send({ newuser });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 5;
    const skippage = (page - 1) * size;
    const newuser = await User.find().skip(skippage).limit(size).lean().exec();
    const pagecount = Math.ceil((await User.find().countDocuments()) / size);
    return res.send({ newuser, pagecount });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

module.exports = router;
