export class GlobalEventService {
    /** callback to show a popover, if defined */
    public onShowPopover?: (label: string, buttonLabel?: string, delay?: number) => void = undefined;

    /** callback to show feedback, if defined */
    public onShowFeedback?: () => void = undefined;

    /** callback to open chat, if defined */
    public onOpenChat?: () => void = undefined;

    showPopover(label: string, buttonLabel?: string, delay?: number): void {
        if (this.onShowPopover) {
            this.onShowPopover(label, buttonLabel, delay);
        }
    }

    openChat(): void {
        if (this.onOpenChat) {
            this.onOpenChat();
        } else {
            console.error("Global open service not fully initialized, onOpen chat not defined");
        }
    }

    showFeedback(): void {
        if (this.onShowFeedback) {
            this.onShowFeedback();
        }
    }
}
