import axios from "axios";
import visaChargeResults from "../constants/visa-charge-result.const";
import retry from "./retry-handler";
import paymentHeaders from "../constants/indentifier-headers.const";
import {log} from "../log/declines-log";

export const pay = async (req, res, retryAttempts = 0) => {
  try {
    const config = {
      headers: { [paymentHeaders.VISA_IDENTIFIER] : "shaqued", "Content-Type": "application/json" },
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
      log.log(req.header(paymentHeaders.MARCHANT_IDENTIFIER), error.response.data.decline_reason );
      return res.status(status).json({ error: data.resultReason });
    }

    return res.status(status).json();
  } catch (error) {

    retry(pay, req, res, retryAttempts, error.response.status);
  }
};
