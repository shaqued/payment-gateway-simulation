const express = require("express");
const axios = require("axios");
import { post } from "../controllers/payment-gateway.controller";
import { get } from "../controllers/charge-statuses.controller";
import validate from "../validations/payment-gateway.validation";
import validateHeader from "../validations/header.validation";
import paymentHeaders from "../constants/indentifier-headers.const";

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => res.render("index", { title: "Express" }));

router.get("/healthcheck", async (req, res, next) => {
  try {
    const mockServerHealthcheckResponse = await axios.get(
      `${req.configuration.mockServerUrl}/healthcheck`
    );
    console.log(
      `Mock server responded to health check with the following response: ${mockServerHealthcheckResponse.data}`
    );

    return res.json({ status: "OK" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "ERR", message: err.response.statusText });
  }
});

router.post("/api/charge",
  (...arg) => validateHeader(...arg, paymentHeaders.MARCHANT_IDENTIFIER),
  validate,
  post);

router.get("/api/chargeStatuses",
  (...arg) => validateHeader(...arg, paymentHeaders.CHARGE_STATUSES_IDENTIFIER),
  get);

module.exports = router;
