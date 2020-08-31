import { classToPlain } from 'class-transformer';
import { DeepPartial } from 'typeorm';

export abstract class BaseModel<T> {
    public constructor(input?: DeepPartial<T>) {
        if (input) {
            for (const [key, value] of Object.entries(input)) {
                (this as any)[key] = value;
            }
        }
    }

    public toObject(): {} {
        return classToPlain(this);
    }
}
