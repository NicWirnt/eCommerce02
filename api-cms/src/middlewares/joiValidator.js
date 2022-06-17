import Joi from "joi";

const fName = Joi.string().alphanum().min(3).max(30).required();
const lName = Joi.string().alphanum().min(3).max(30).required();
const phone = Joi.string().alphanum().min(10).max(15).required();
const dob = Joi.date().allow(null);
const address = Joi.string().allow(null);
const email = Joi.string().required().email({ minDomainSegments: 2 });
const password = Joi.string().required().min(6);

const validator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }

  next();
};

export const newAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    fName,
    lName,
    phone,
    dob,
    address,
    email,
    password,
  });

  validator(schema, req, res, next);
};
