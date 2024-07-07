const {
  getAllMovementsController,
  getMovementController,
  postMovementController,
  updateMovementController,
  deleteMovementController
} = require("@controllers/movements");

const getAllMovements = async (req, res) => {
  const result = await getAllMovementsController(req.query);
  res.status(200).json(result);
};

const getMovement = async (req, res) => {
  const { id } = req.params;
  const result = await getMovementController(id);
  res.status(200).json(result);
};

const createMovement = async (req, res) => {
  const result = await postMovementController(req.body);
  res.status(201).json(result);
};

const updateMovement = async (req, res) => {
  const { id } = req.params;
  const result = await updateMovementController(id, req.body);
  res.status(200).json(result);
};

const deleteMovement = async (req, res) => {
  const { id } = req.params;
  const result = await deleteMovementController(id);
  res.status(200).json(result);
};

module.exports = {
  getAllMovements,
  getMovement,
  createMovement,
  updateMovement,
  deleteMovement
};