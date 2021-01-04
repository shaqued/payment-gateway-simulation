import axios from "axios";
import retry from "./retry-handler";
import paymentHeaders from "../constants/payment-headers.const";

export const pay = async (req, res, retryAttempts = 0) => {
  try {
    const config = {
      headers: { [paymentHeaders.MASTERCARD_IDENTIFIER]: "shaqued", "Content-Type": "application/json" },
    };

    const {
      fullName,
      creditCardNumber: card_number,
      expirationDate: expiration,
      cvv,
      amount: charge_amount,
    } = req.body;
    const [first_name, last_name] = fullName.split(" ");

    const { status } = await axios.post(
      `${req.configuration.mockServerUrl}/mastercard/capture_card`,
      {
        first_name,
        last_name,
        card_number,
        expiration: expiration.replace("/", "-"),
        cvv,
        charge_amount,
      },
      config
    );

    return res.status(status).json();
  } catch (error) {
    if (error.response.data.decline_reason) {
      return res
        .status(200)
        .json({ error: error.response.data.decline_reason });
    }

    retry(pay, req, res, retryAttempts, error.response.status);
  }
};
