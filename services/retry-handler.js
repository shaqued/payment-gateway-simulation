import {MAX_RETRY_ATTEMPTS} from "../constants/common.const";

export default (pay, req, res, retryAttempts, status) => {
    if(retryAttempts < MAX_RETRY_ATTEMPTS){
        retryAttempts++;
        setTimeout(() => pay(req, res, retryAttempts), Math.pow(retryAttempts, 2) * 1000);
      } else{
        return res.sendStatus(status);
      }
}