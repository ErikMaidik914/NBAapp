export class Account {
  accountId;
  username;
  password;
  static lastUsedId = 0;

  constructor(username, password) {
    User.lastUsedId += 1;

    this.accountId = User.lastUsedId;
    this.usernamename = username;
    this.password = password;
  }

  getAccountId() {
    return this.accountId;
  }

  setAccountId(newAccountId) {
    this.accountId = newAccountId;
  }

  getUsername() {
    return this.username;
  }

  setName(newUsername) {
    this.username = newUsername;
  }

  getPassword() {
    return this.password;
  }

  setPassword(newPassword) {
    this.password = newPassword;
  }
}
