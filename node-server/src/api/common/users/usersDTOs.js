class UserDTO {
  constructor(data) {
    this.id = data._id;
    this.email = data.email;
    this.verified = data.verified;
    this.name = data.name;
    this.whatsapp = data.whatsapp;
    this.createdAt = data.createdAt;
  }
}

module.exports = {
  UserDTO
};