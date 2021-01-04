const axios = require("axios");
import {MAX_RETRY_ATTEMPTS} from "../constants/common.const";
import visaChargeResults from "../constants/visa-charge-result.const";

export const pay = async (req, res, retryAttempts = 1) => {
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

    if (data.chargeResult === visaChargeResults.FAILURE) {
      return res.status(status).json({ error: data.resultReason });
    }

    return res.status(status).json();
  } catch (error) {

    if(retryAttempts <= MAX_RETRY_ATTEMPTS){
      setTimeout(() => pay(req, res, ++retryAttempts), Math.pow(retryAttempts, 2) * 1000);
    } else{
      return res.sendStatus(error.response.status);
    }
  }
};
