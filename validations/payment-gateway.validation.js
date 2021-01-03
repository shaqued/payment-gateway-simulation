import creditCardCompanies from "../constants/credit-card-company.const";
import paymentHeaders from "../constants/payment-headers.const";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

const paymentSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  creditCardNumber: Joi.string().required(),
  creditCardCompany: Joi.string()
    .required()
    .valid(...Object.values(creditCardCompanies)),
  expirationDate: Joi.date().format("MM/YY").raw().required(),
  cvv: Joi.string().required(),
  amount: Joi.number().required(),
});

export default (req, res, next) => {
  const { error } = paymentSchema.validate(req.body);

  if (!req.header(paymentHeaders.MARCHANT_IDENTIFIER) || error) {
    res.sendStatus(400);
  } else {
    next();
  }
};
