const { AccountModel, UserModel } = require("@models");
const { NotFoundError } = require("@utils/apiErrors");
const { AccountDTO } = require("./accountDTOs");

const AccountService = {
  async getAllAccounts (id) {
    const accounts = await AccountModel.findAllDataQuery({ userId: id }).populate('selectedCurrencyId');

    if (!accounts) throw new NotFoundError(`Accounts not found`);

    return {
      data: accounts.map(account => new AccountDTO(account)),
      count: accounts.length,
      success: 'Accounts retrieved successfully'
    };
  },

  async changeCurrecy(id, selectedCurrencyId) {
    const {selectedAccountId} = await UserModel.findDataById(id);
    const account = await AccountModel.findDataById(selectedAccountId);

    //here is nedeed to update the account balance with the new currency using the currency rate
    //but for now we will just update the selectedCurrencyId

    if (!account) {
      throw new NotFoundError(`Account with id ${id} not found`);
    }

    account.selectedCurrencyId = selectedCurrencyId;
    await account.save();
    return {
      success: 'Account updated successfully'
    };
  },
  
  // async getAccount (id) {
  //   const account = await AccountModel.findDataById(id);
  //   if (!account) {
  //     throw new NotFoundError(`Account with id ${id} not found`);
  //   }
  //   return {
  //     data: account,
  //     success: 'Account retrieved successfully'
  //   };
  // },
  
  // async postAccount (data) {
  //   if (!data.name || !data.balance) {
  //     throw new ValidationError("Name and balance are required");
  //   }
  //   await AccountModel.create(data);
  //   return {
  //     success: 'Account created successfully'
  //   };
  // },
  
  // async updateAccount (id, data) {
  //   const updatedAccount = await AccountModel.updateData(id, data);
  //   if (!updatedAccount) {
  //     throw new NotFoundError(`Account with id ${id} not found`);
  //   }
  //   return {
  //     success: 'Account updated successfully'
  //   };
  // },
  
  // async deleteAccount (id) {
  //   const deletedAccount = await AccountModel.removeData(id);
  //   if (!deletedAccount) {
  //     throw new NotFoundError(`Account with id ${id} not found`);
  //   }
  //   return {
  //     success: 'Account deleted successfully'
  //   };
  // },
}

module.exports = AccountService;