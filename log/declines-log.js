class DeclinesLog {
    constructor() {
      this.map = new Map();
    }
  
    log(marchantIdentifier, declineReson) {
      if (this.map.has(marchantIdentifier)){
          this.map.get(marchantIdentifier)[declineReson] = 
          (this.map.get(marchantIdentifier)[declineReson] || 0)+1;
      } else {
        this.map.set(marchantIdentifier, {[declineReson] : 1});
      }
    }
  
    get(marchantIdentifier) {
        if(this.map.has(marchantIdentifier)){
           return this.map.get(marchantIdentifier);
        } return {};
    }
  }

const log = new DeclinesLog();

export {log};