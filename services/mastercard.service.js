import axios from "axios";
import retry from "./retry-handler";
import paymentHeaders from "../constants/indentifier-headers.const";
import { log } from "../log/declines-log";

const buildBody = body => {
  const { fullName, creditCardNumber: card_number, cvv, amount: charge_amount } = body;
  const [first_name, last_name] = fullName.split(" ");
  const expiration = body.expirationDate.replace("/", "-");

  return { first_name, last_name, card_number, expiration, cvv, charge_amount };
}

export const pay = async (req, res, retryAttempts = 0) => {
  const config = {
    headers: {
      [paymentHeaders.MASTERCARD_IDENTIFIER]: "shaqued",
      "Content-Type": "application/json",
    },
  };

  const requestBody = buildBody(req.body);

  try {
    const { status } = await axios.post(
      `${req.configuration.mockServerUrl}/mastercard/capture_card`,
      requestBody,
      config
    );

    return res.status(status).json();
  } catch (error) {

    if (error.response.data.decline_reason) {
      log(req.header(paymentHeaders.MARCHANT_IDENTIFIER),
          error.response.data.decline_reason);

      return res.status(200).json({ error: error.response.data.decline_reason });
    }
    
    retry(pay, req, res, retryAttempts, error.response.status);
  }
};
