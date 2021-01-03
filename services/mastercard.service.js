import axios from "axios";

export default async (req, res) => {
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

    return res.sendStatus(error.response.status);
  }
};
