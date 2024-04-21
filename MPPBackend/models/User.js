export class User {
  id;
  name;
  team;
  pictureUrl;
  age;
  static lastUsedId = 0;

  constructor(name, team, pictureUrl, age) {
    User.lastUsedId += 1;

    this.id = User.lastUsedId;
    this.name = name;
    this.team = team;
    this.pictureUrl = pictureUrl;
    this.age = age;
  }

  getId() {
    return this.id;
  }

  setId(newId) {
    this.id = newId;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  getTeam() {
    return this.team;
  }

  setTeam(newTeam) {
    this.team = newTeam;
  }

  getPictureUrl() {
    return this.pictureUrl;
  }

  setPictureUrl(newPictureUrl) {
    this.pictureUrl = newPictureUrl;
  }

  getAge() {
    return this.age;
  }

  setAge(newAge) {
    this.age = newAge;
  }
}
