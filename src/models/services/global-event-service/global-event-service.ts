export class GlobalEventService {
    public onShowPopover?: (label: string, buttonLabel?: string, delay?: number) => void = undefined;

    public onShowFeedback?: () => void = undefined;

    showPopover(label: string, buttonLabel?: string, delay?: number): void {
        if (this.onShowPopover) {
            this.onShowPopover(label, buttonLabel, delay);
        }
    }

    showFeedback(): void {
        if (this.onShowFeedback) {
            this.onShowFeedback();
        }
    }
}
