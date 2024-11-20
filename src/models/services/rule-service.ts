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

        return rules.find((rule) => {
            const domains = rule.domain instanceof Array ? rule.domain : [rule.domain];
            return domains.find(this.acceptDomain(window.location));
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
        location: Location
    ): (domain: string) => boolean {
        return (domain: string) => {
            if (domain.startsWith("/")) {
                return location.pathname.toLowerCase().startsWith(domain.toLowerCase());
            } else {
                return location.href.toLowerCase().startsWith(domain.toLowerCase());
            }
        };
    }
}
