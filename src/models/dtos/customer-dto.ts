export class CustomerDto {
    name: string;

    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    get username(): string | undefined {
        if (this.name) {
            if (this.email) {
                return this.name + " <" + this.email + ">";
            } else {
                return this.name;
            }
        }

        if (this.email) {
            return this.email;
        }

        return undefined;
    }

    get initials() {
        const names = this.name.split(" ");
        let initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }

        return initials;
    }
}
