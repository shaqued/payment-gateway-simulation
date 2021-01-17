import { pay as mastercardService } from "./mastercard.service";
import { pay as visaService } from "./visa.service";
import creditCardCompanies from "../constants/credit-card-company.const";

const dict = {
  [creditCardCompanies.MASTEDCARD]: mastercardService,
  [creditCardCompanies.VISA]: visaService,
};

export default creditCardCompany => dict[creditCardCompany];