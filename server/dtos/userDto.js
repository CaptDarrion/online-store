module.exports = class UserDto {
  email;
  id;
  role;
  isActivated;
  createdAt;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.role = model.role;
    this.isActivated = model.isActivated;
    this.createdAt = model.createdAt;
  }
};
