import { StorageInterface } from "../../interfaces/storage/storage-interface";

export abstract class Storage<T extends string> {
    private readonly storage: StorageInterface;

    protected constructor(getStorage = (): StorageInterface => window.localStorage) {
        this.storage = getStorage();
    }

    protected get(key: T): string | null {
        return this.storage.getItem(key);
    }

    protected set(key: T, value: string): void {
        this.storage.setItem(key, value);
    }

    protected clearItem(key: T): void {
        this.storage.removeItem(key);
    }

    protected clearItems(keys: T[]): void {
        keys.forEach((key) => this.clearItem(key));
    }
}
