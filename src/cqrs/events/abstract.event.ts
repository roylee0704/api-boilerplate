export abstract class AbstractEvent {
    public readonly createdAt: Date;
    protected constructor() {
        this.createdAt = new Date();
    }
}
