const { MovementModel, AccountModel, UserModel, CategoryModel } = require("@root/src/models");
const { NotFoundError, ValidationError } = require("@utils/apiErrors");
const { default: mongoose } = require("mongoose");

const { MovementDTO } = require("./movementDTOs");

const MovementService = {

  async getAccountMovements(id) {

    const { selectedAccountId } = await UserModel.findDataById(id);
    if (!selectedAccountId) throw new NotFoundError(`Account with for user ${id} not found`);

    const movements = await MovementModel.findAllData({
      accountId: selectedAccountId
    }).populate('categories');;

    return {
      data: movements.map(movement => new MovementDTO(movement)),
      count: movements.length,
      success: 'Movements retrieved successfully'
    };
  },

  async postMovement(req) {

    const data = req.body;
    const user = await UserModel.findDataById(req.user.id);
    console.log(user);

    if (!data.amount || !data.title || !data.type) {
      throw new ValidationError("Amount, title, type  are required");
    }

    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      console.log("transaction", user.selectedAccountId.toString());
      
      //this can be improved
      let verifiedCategories = [];
      if (data.categories && data.categories.length > 0) {
        verifiedCategories = await CategoryModel.find({
          _id: { $in: data.categories },
          accountId: user.selectedAccountId
        }).session(session);

        if (verifiedCategories.length !== data.categories.length) {
          throw new ValidationError("One or more categories are invalid or do not belong to this account");
        }
      }

      const newMovement = new MovementModel({
        title: data.title,
        description: data.description,
        accountId: user.selectedAccountId,
        type: data.type,
        amount: data.amount,
        categories: data.categories,
      });

      await newMovement.save({ session });

      const account = await AccountModel.findById(user.selectedAccountId).session(session);
      if (!account) {
        throw new NotFoundError(`Account with id ${user.selectedAccountId} not found`);
      }

      if (data.type === 'income') {
        account.balance += parseInt(data.amount);
      } else if (data.type === 'expense') {
        account.balance -= parseInt(data.amount);
      }

      await account.save({ session });

      await session.commitTransaction();
      return { 
        success: 'Movement created successfully',
        data: { id: newMovement._id }
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

}

module.exports = MovementService;