const {
  getAllAccountsController,
  getAccountController,
  postAccountController,
  updateAccountController,
  deleteAccountController
} = require('./accountsController')

const getAllAccounts = async (req, res) => {
  const result = await getAllAccountsController(req.query)
  res.status(200).json(result)
}

const getAccount = async (req, res) => {
  const { id } = req.params
  const result = await getAccountController(id)
  res.status(200).json(result)
}

const createAccount = async (req, res) => {
  const result = await postAccountController(req.body)
  res.status(201).json(result)
}

const updateAccount = async (req, res) => {
  const { id } = req.params
  const result = await updateAccountController(id, req.body)
  res.status(200).json(result)
}

const deleteAccount = async (req, res) => {
  const { id } = req.params
  const result = await deleteAccountController(id)
  res.status(200).json(result)
}

module.exports = {
  getAllAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount
}