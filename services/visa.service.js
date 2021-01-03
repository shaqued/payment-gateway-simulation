const axios = require("axios");

export default async (req, res, next) => {
  try {
    const config = {
      headers: { identifier: "shaqued", "Content-Type": "application/json" },
    };

    const {
      fullName,
      creditCardNumber: number,
      expirationDate: expiration,
      cvv,
      amount: totalAmount,
    } = req.body;

    const { status, data } = await axios.post(
      `${req.configuration.mockServerUrl}/visa/api/chargeCard`,
      {
        fullName,
        number,
        expiration,
        cvv,
        totalAmount,
      },
      config
    );

    if (data.chargeResult === "Failure") {
      return res.status(status).json({ error: data.resultReason });
    }

    return res.status(status).json();
  } catch (err) {
    return res.senStatus(err.response.status);
  }
};
