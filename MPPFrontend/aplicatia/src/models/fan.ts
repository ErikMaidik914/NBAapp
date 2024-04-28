export class Fan {
    private id: number;
    private userId: number;
    private name: string;
    private pictureUrl: string;
    private static lastUsedId: number = 0;

    public constructor(userId: number, name: string, pictureUrl: string) {
        Fan.lastUsedId += 1;

        this.id = Fan.lastUsedId;
        this.userId = userId;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }

    public getId(): number {
        return this.id;
    }

    public setId(newId: number) {
        this.id = newId;
    }

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(newId: number) {
        this.userId = newId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public getPictureUrl(): string {
        return this.pictureUrl;
    }

    public setPictureUrl(newPictureUrl: string) {
        this.pictureUrl = newPictureUrl;
    }
}
