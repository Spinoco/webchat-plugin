export class CustomerDto {
    name: string;

    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
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
