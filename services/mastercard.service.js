import axios from "axios";

const MAX_RETRY_ATTEMPTS = 3;

export const pay = async (req, res, retryAttempts = 1) => {
  try {
    const config = {
      headers: { identifier: "shaqued", "Content-Type": "application/json" },
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

    if(retryAttempts <= MAX_RETRY_ATTEMPTS){
      setTimeout(() => pay(req, res, ++retryAttempts), Math.pow(retryAttempts, 2) * 1000);
    } else{
      return res.sendStatus(error.response.status);
    }
  }
};
