import Joi from "joi";
import { description, tagsEnum } from "../constant/constant.js";

const foodSchema = Joi.object()
  .keys({
    name: Joi.string()
      .custom((value, msg) => {
        if (value.match(/^[a-zA-Z]{3,30}( [a-zA-Z]{3,30}){0,2}$/)) {
          return true;
        }

        return msg.message(
          "Food name must begin with a letter and have a minimum of three characters"
        );
      })
      .required()
      .lowercase(),

    rate: Joi.number().required().messages({
      "any.required": "rate is required.",
      "number.base": "rate must be a number.",
    }),
    foodImage: Joi.string().required().messages({
      "any.required": "foodImage is required.",
      "string.base": "foodImage must be a string.",
    }),
    discountedRate: Joi.number()
      .less(Joi.ref("rate"))
      .allow(null)
      .optional()
      .messages({
        "number.base": "discountedRate must be a number.",
        "number.less": "discountedRate must be less than the rate.",
        "any.required": "discountedRate is required.",
      }),
    description: Joi.string()
      .min(3)
      .max(description.LONG)
      .required()
      .messages({ "string.base": "Description must be in alphabets" }),

    category: Joi.string().required().messages({
      "string.base": "Please enter a valid category id",
    }),
    // category: Joi.string()
    //   .required()
    //   .custom(async (value, msg) => {
    //     const isValidCategory = await Category.findById(value);
    //     if (!isValidCategory) {
    //       return msg.message("Invalid Category Id");
    //     }
    //     return true;
    //   }),
    tags: Joi.string()
      .valid("breakfast", "lunch", "dinner", "snacks", "all time")
      .required()
      .messages({
        "string.base":
          "Tags must be breakfast, lunch, dinner snack or all time",
      }),
    isInMenu: Joi.boolean(),
    availableTime: Joi.object().keys({
      from: Joi.date().iso().optional().allow(""),
      to: Joi.date().iso().optional().allow(""),
    }),
    initialQuantity: Joi.number(),
    availableQuantity: Joi.number(),
  })
  .unknown(false);

export default foodSchema;
