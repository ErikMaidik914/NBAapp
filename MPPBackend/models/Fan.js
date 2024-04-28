export class Fan {
  id;
  userId;
  name;
  pictureUrl;
  static lastUsedId = 0;

  constructor(userId, name, pictureUrl) {
    Fan.lastUsedId += 1;

    this.id = Fan.lastUsedId;
    this.userId = userId;
    this.name = name;
    this.pictureUrl = pictureUrl;
  }

  getId() {
    return this.id;
  }

  setId(newId) {
    this.id = newId;
  }

  getUserId() {
    return this.UserId;
  }

  setUserId(newId) {
    this.UserId = newId;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getPictureUrl() {
    return this.pictureUrl;
  }

  setPictureUrl(newPictureUrl) {
    this.pictureUrl = newPictureUrl;
  }
}
