const email = require("../controllers/EmailController");
const emailValidation = require("../middlewares/EmailValidation");

let router = require("express").Router();

router.post("/", emailValidation, email);
module.exports = router;
