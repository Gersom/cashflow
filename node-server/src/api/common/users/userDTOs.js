class UserDTO {
  constructor(data) {
    this.id = data._id;
    this.email = data.email;
    this.verified = data.verified;
    this.name = data.name;
    this.whatsapp = data.whatsapp;
    this.profilePic = data.profilePic;
    this.selectedAccountId = data.selectedAccountId;
    this.createdAt = data.createdAt;
  }
}

module.exports = {
  UserDTO
};