import paymentHeaders from "../constants/indentifier-headers.const";
import  {get as getLog} from "../log/declines-log";

const format = merchantLog =>
  Object.keys(merchantLog)
    .map(reason => ({ reason, count: merchantLog[reason] }));

export const get = (req, res) => {
  const merchantLog = format(getLog(req.header(paymentHeaders.MARCHANT_IDENTIFIER)));

  return res.status(200).json(merchantLog);
};
