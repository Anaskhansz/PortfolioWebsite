const Joi = require("joi");

const emailValidation = (req, res, next) => {
  try {
    const emailSchema = Joi.object().keys({
      from: Joi.string().email().required(),
      subject: Joi.string().min(6).required(),
      message: Joi.string().min(6).required(),
    });

    const { error } = emailSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid form data", success: false });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = emailValidation;
