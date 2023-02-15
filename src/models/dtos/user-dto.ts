export class UserDto {
    avatarUrl: string | null;

    email: string;

    name: string;

    constructor(name: string, email: string, avatarUrl: string | null) {
        this.name = name;
        this.email = email;
        this.avatarUrl = avatarUrl;
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
