export class PopoverDto {
    public readonly label?: string;
    public readonly buttonLabel?: string;
    public readonly delay?: number;

    constructor(label?: string, buttonLabel?: string, delay?: number) {
        this.label = label;
        this.buttonLabel = buttonLabel;
        this.delay = delay;
    }

    shouldShowPopover(): boolean {
        return this.label !== undefined;
    }
}
