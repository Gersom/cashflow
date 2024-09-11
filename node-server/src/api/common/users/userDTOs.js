class UserDTO {
  constructor(data) {
    this.id = data._id;
    this.email = data.email;
    this.verified = data.verified;
    this.name = data.name;
    this.whatsapp = data.whatsapp;
    this.profilePic = data.profilePic;
    this.selectedAccount = new AccountDTO(data.selectedAccountId);
    this.createdAt = data.createdAt;
  }
}

class AccountDTO {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.balance = data.balance;
    this.currency = new CurrencyDTO(data.selectedCurrencyId);
  }
}

class CurrencyDTO {
  constructor(data) {
    this.id = data._id;
    this.symbol = data.symbol;
    this.name = data.name;
    this.code = data.code;
    this.plural = data.plural;
    this.countryCode = data.countryCode;
    this.decimalPlaces = data.decimalPlaces;
  }
}



module.exports = {
  UserDTO
};