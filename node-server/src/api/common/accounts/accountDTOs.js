class AccountDTO {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.currency = data.selectedCurrencyId;
    this.userId = data.userId;
    console.log(data);
    
    this.balance = new BalanceDTO(data);
  }
}

class BalanceDTO{
    constructor(data){
        this.balance = `${data.selectedCurrencyId.symbol} ${data.balance.toFixed(data.selectedCurrencyId.decimalPlaces)}`;
    }
}

module.exports = {
  AccountDTO
};