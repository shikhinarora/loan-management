class User {
  constructor (
    username,
    password,
    firstName,
    lastName,
    mobile,
    isActive,
  ) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobile = mobile;
    this.isActive = isActive;
  };
};

module.exports = User