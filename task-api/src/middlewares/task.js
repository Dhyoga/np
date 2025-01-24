const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateTask };
