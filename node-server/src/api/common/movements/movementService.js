const { MovementModel, AccountModel, UserModel, CategoryModel } = require("@root/src/models");
const { NotFoundError, ValidationError } = require("@utils/apiErrors");
const { default: mongoose } = require("mongoose");

const MovementService = {

  async getAccountMovements(id) {

    const { selectedAccount } = await UserModel.findDataById(id);
    if (!selectedAccount) throw new NotFoundError(`Account with for user ${id} not found`);

    const movements = await MovementModel.findAllData({
      accountId: selectedAccount
    });

    return {
      data: movements,
      count: movements.length,
      success: 'Movements retrieved successfully'
    };
  },

  async postMovement(data) {
    if (!data.amount || !data.title || !data.type || !data.accountId) {
      throw new ValidationError("Amount, title, type and accountId are required");
    }

    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();

      //this can be improved
      let verifiedCategories = [];
      if (data.categories && data.categories.length > 0) {
        verifiedCategories = await CategoryModel.find({
          _id: { $in: data.categories },
          accountId: data.accountId
        }).session(session);

        if (verifiedCategories.length !== data.categories.length) {
          throw new ValidationError("One or more categories are invalid or do not belong to this account");
        }
      }

      const newMovement = new MovementModel({
        title: data.title,
        description: data.description,
        accountId: data.accountId,
        type: data.type,
        amount: data.amount,
        categories: data.categories, // TODO: Verify if the categories exist and belong to the account
      });

      await newMovement.save({ session });

      const account = await AccountModel.findById(data.accountId).session(session);
      if (!account) {
        throw new NotFoundError(`Account with id ${data.accountId} not found`);
      }

      if (data.type === 'income') {
        account.balance += parseInt(data.amount);
      } else if (data.type === 'expense') {
        account.balance -= parseInt(data.amount);
      }

      await account.save({ session });

      await session.commitTransaction();
      return { success: 'Movement created successfully' };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

}

module.exports = MovementService;