let Joi = require("joi");
let signupValidation = (req, res, next) => {
  const signupSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

let loginValidation = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports = { signupValidation, loginValidation };
