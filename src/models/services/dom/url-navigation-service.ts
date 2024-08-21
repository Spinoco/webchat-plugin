import { GlobalEventService } from "../global-event-service/global-event-service";
import { DomService } from "./dom-service";

/**
 * This service is used to process all navigation events passed as url (hash part)
 *
 * Particularly this is used to handle url changes when on the page, and also
 * when the hash part of the url is passed in as parameter on the plugin load
 */
export class UrlNavigationService {
    // allows to reference actions and events as a result of the hash navigation changes
    private globalEventService: GlobalEventService;
    private window: Window;
    private initialized = false;

    constructor(globalEventService: GlobalEventService, domService: DomService) {
        this.globalEventService = globalEventService;
        this.window = domService.getWindow();
    }

    /** used to register service. This shall be called only once.
     * This register service to all necessary hooks,
     * that are required to monitor for hash navigation to work correctly
     */
    initialize(): void {
        if (this.initialized) {
            console.log("HashNavigationService already initialized");
            return;
        } else {
            window.addEventListener("hashchange", () => {
                this.handleHashUrl();
            });

            // check if there is a hash url when we are initializing this
            this.handleHashUrl();
        }
    }

    /** Main loop to handle the hash url when changes and when it is initialized */
    handleHashUrl(): void {
        const hash = window.location.hash;
        if (hash.startsWith("#sp-webchat")) {
            window.location.hash = ""; // clear the has so we can trigger this again if needed
            const paramsRaw = hash.slice(10).split(";");
            const params = paramsRaw.filter((command) => command.trim().length > 0);
            params.forEach((command) => {
                this.handleCommand(command);
            });
        }
    }

    /**
     * Handles / interprets commands from the hash url
     * @param command
     */
    handleCommand(command: string): void {
        if (command.startsWith("open")) {
            this.globalEventService.openChat();
        }
    }
}
