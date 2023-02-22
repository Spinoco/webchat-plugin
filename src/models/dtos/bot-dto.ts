export class BotDto {
    private userAvatarUrl?: string;

    private userAvatarBase64?: string;

    private botAvatarUrl?: string;

    private botAvatarBase64?: string;

    setUserAvatarUrl(value: string) {
        this.userAvatarUrl = value;
    }

    setUserAvatarBase64(value: string) {
        this.userAvatarBase64 = value;
    }

    setBotAvatarUrl(value: string) {
        this.botAvatarUrl = value;
    }

    setBotAvatarBase64(value: string) {
        this.botAvatarBase64 = value;
    }

    getUserAvatar(): string | undefined {
        return this.userAvatarUrl ?? this.userAvatarBase64;
    }

    getBotAvatar(): string | undefined {
        return this.botAvatarUrl ?? this.botAvatarBase64;
    }
}
