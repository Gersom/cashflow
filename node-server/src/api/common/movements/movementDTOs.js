const { CategoryDTO } = require("@api/common/categories/categoryDTOs");

class MovementDTO {
  constructor(data) {
    this.id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.type = data.type;
    this.amount = data.amount.toFixed(2);
    this.categories = data.categories.map(category => new CategoryDTO(category));
    this.createdAt = data.createdAt;
  }
}
module.exports = {
  MovementDTO
};