export class GlobalEventService {
    public onShowPopover?: (label: string, buttonLabel?: string, delay?: number) => void = undefined;

    showPopover(label: string, buttonLabel?: string, delay?: number): void {
        if (this.onShowPopover) {
            this.onShowPopover(label, buttonLabel, delay);
        }
    }
}
