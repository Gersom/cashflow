const { AccountModel } = require("@models");
const { NotFoundError, ValidationError } = require("@utils/errors");

const getAllAccountsController = async (query = {}) => {
  const accounts = await AccountModel.findAllData(query);
  return {
    data: accounts,
    count: accounts.length,
    success: 'Accounts retrieved successfully'
  };
};

const getAccountController = async (id) => {
  const account = await AccountModel.findDataById(id);
  if (!account) {
    throw new NotFoundError(`Account with id ${id} not found`);
  }
  return {
    data: account,
    success: 'Account retrieved successfully'
  };
};

const postAccountController = async (data) => {
  if (!data.name || !data.balance) {
    throw new ValidationError("Name and balance are required");
  }
  await AccountModel.create(data);
  return {
    success: 'Account created successfully'
  };
};

const updateAccountController = async (id, data) => {
  const updatedAccount = await AccountModel.updateData(id, data);
  if (!updatedAccount) {
    throw new NotFoundError(`Account with id ${id} not found`);
  }
  return {
    success: 'Account updated successfully'
  };
};

const deleteAccountController = async (id) => {
  const deletedAccount = await AccountModel.removeData(id);
  if (!deletedAccount) {
    throw new NotFoundError(`Account with id ${id} not found`);
  }
  return {
    success: 'Account deleted successfully'
  };
};

module.exports = {
  getAllAccountsController,
  getAccountController,
  postAccountController,
  updateAccountController,
  deleteAccountController
};