class AccountDTO {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.currency = data.currencyId;
    this.userId = data.userId;
    console.log(data);
    
    this.balance = new BalanceDTO(data);
  }
}

class BalanceDTO{
    constructor(data){
        this.balance = `${data.currencyId.symbol} ${data.balance.toFixed(data.currencyId.decimalPlaces)}`;
    }
}

module.exports = {
  AccountDTO
};