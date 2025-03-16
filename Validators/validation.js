import Joi from "joi";

//SignUp and SignIn
const signUpSchema = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[a-zA-z]+$/)
    .min(1)
    .required(),
  email: Joi.string().trim().email().min(1).required(),
  password: Joi.string().trim().min(8).required(),
  dateofBirth: Joi.date().required(),
});

const signInSchema = Joi.object({
  email: Joi.string().trim().email().min(1).required(),
  password: Joi.string().trim().required(),
});

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

//Other Routes
const updateMovieSchema = Joi.object({
  watched: Joi.boolean().required(),
});

const addMovieSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  publishedYear: Joi.number().integer().required(),
  watched: Joi.boolean().default(false),
});

function validateWatchlist(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
  };
}

export const validateUpdateMovie = validateWatchlist(updateMovieSchema);
export const validateAddMovie = validateSchema(addMovieSchema);

export const signUpValidation = validateSchema(signUpSchema);
export const signInValidation = validateSchema(signInSchema);
