const joi=require ('joi');

const contactSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});



module.exports={contactSchema} 