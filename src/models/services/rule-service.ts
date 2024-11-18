import { RuleInterface } from "../interfaces/configuration/rule-interface";
import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";

export class RuleService {
    private rule?: RuleInterface;

    constructor(config: ConfigurationInterface) {
        this.rule = this.findRuleForCurrentDomain(config.rules ? config.rules : []);
    }

    /**
     * Yields to true, if the chat may be displayed on the current domain.
     * If false, this means that the chat may not be displayed on the current domain.
     */
    public mayDisplayForCurrentDomain(): boolean {
        return this.rule == null || this.rule.disable !== true;
    }

    /**
     * Returns the rule for the current domain.
     */
    private findRuleForCurrentDomain(rules: RuleInterface[]): RuleInterface | undefined {
        const location = window.location;
        const currentPathName = location.pathname.toLowerCase();
        const currentHost = location.hostname.toLowerCase();
        const currentPort = location.port;
        const currentProtocol = location.protocol;

        return rules.find((rule) => {
            const domains = rule.domain instanceof Array ? rule.domain : [rule.domain];
            return domains.find(this.acceptDomain(currentPathName, currentHost, currentPort, currentProtocol));
        });
    }

    /**
     * Returns a function that checks if the domain matches the current domain.
     * @param currentPathName   Path name where the chat is displayed.
     * @param currentHost       Host where the chat is displayed.
     * @param currentPort       Port where the chat is displayed.
     * @param currentProtocol   Protocol where the chat is displayed.
     * @private
     */
    private acceptDomain(
        currentPathName: string,
        currentHost: string,
        currentPort: string,
        currentProtocol: string,
    ): (domain: string) => boolean {
        return (domain: string) => {
            if (domain.startsWith("/")) {
                return currentPathName.startsWith(domain.toLowerCase());
            } else {
                let url: URL | undefined = undefined;
                try {
                    url = new URL(domain);
                } catch (e) {
                    console.error(`Invalid domain: ${domain}`);
                }

                if (url === undefined) return false;
                else {
                    const portMatch = url.port == null || url.port === "" || url.port === currentPort;
                    const protocolMatch = url.protocol === currentProtocol;
                    const hostMatch = url.hostname === currentHost;
                    const pathMatch = currentPathName.startsWith(url.pathname.toLowerCase());

                    return portMatch && protocolMatch && hostMatch && pathMatch;
                }
            }
        };
    }
}
