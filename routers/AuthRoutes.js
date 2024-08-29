let router = require("express").Router();
let {
  signup,
  login,
  refresh,
  deleteAccount,
} = require("../controllers/AuthControllers");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/AuthValidation");
const User = require("../models/User");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/refresh", refresh);

router.post("/delete-account", deleteAccount);

router.get("/users", async (req, res) => {
  let data = await User.find({});
  res.json({ data: data });
});
module.exports = router;
