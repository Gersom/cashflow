class CategoryDTO {
  constructor (data) {
    this.id = data._id
    this.name = data.name
    this.iconName = data.icon.startsWith('icon') ? data.icon.slice(5) : data.icon
    this.color = data.color
  }
}

module.exports = {
  CategoryDTO
}