import identifierHeaders from "../constants/indentifier-headers.const";

export default (req, res, next) => {
    if (!req.header(identifierHeaders.CHARGE_STATUSES_IDENTIFIER)) {
      res.sendStatus(400);
    } else {
      next();
    }
  };