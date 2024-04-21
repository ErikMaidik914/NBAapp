export class User {
    private id: number;
    private name: string;
    private team: string;
    private pictureUrl: string;
    private age: number;
    private static lastUsedId: number = 0;

    public constructor(name: string, team: string, pictureUrl: string, age: number) {
        User.lastUsedId += 1;

        this.id = User.lastUsedId;
        this.name = name;
        this.team = team;
        this.pictureUrl = pictureUrl;
        this.age = age;
    }

    public getId(): number {
        return this.id;
    }

    public setId(newId: number) {
        this.id = newId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public getTeam(): string {
        return this.team;
    }

    public setTeam(newTeam: string) {
        this.team = newTeam;
    }

    public getPictureUrl(): string {
        return this.pictureUrl;
    }

    public setPictureUrl(newPictureUrl: string) {
        this.pictureUrl = newPictureUrl;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(newAge: number): void {
        this.age = newAge;
    }
}
