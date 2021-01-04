import paymentHeaders from "../constants/indentifier-headers.const";
import { log } from "../log/declines-log";

const format = (merchantLog) => {
  const data = [];
  for (const [key, value] of Object.entries(merchantLog)) {
    data.push({ reason: key, count: value });
  }

  return data;
};

export const get = (req, res) => {
  const merchantLog = format(
    log.get(req.header(paymentHeaders.MARCHANT_IDENTIFIER))
  );

  return res.status(200).json(merchantLog);
};
