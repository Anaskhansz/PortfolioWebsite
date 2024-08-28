let router = require("express").Router();
let { signup, login, refresh } = require("../controllers/AuthControllers");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/AuthValidation");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/refresh", refresh);

module.exports = router;
