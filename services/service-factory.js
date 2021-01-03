import {pay as mastercardService} from "./mastercard.service";
import {pay as visaService} from "./visa.service";
import creditCardCompanies from "../constants/credit-card-company.const";

export default (creditCardCompany) => {
  switch (creditCardCompany) {
    case creditCardCompanies.MASTEDCARD: {
      return mastercardService;
    }
    case creditCardCompanies.VISA: {
      return visaService;
    }
    default:
      break;
  }
};
