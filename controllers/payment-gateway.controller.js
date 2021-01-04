import serviceFactory from "../services/service-factory";

export const post = async (req, res) => {
  const paymentProcedure = serviceFactory(req.body.creditCardCompany);

  await paymentProcedure(req, res);
};