export interface RuleInterface {
    /** Domain for which this rule applies. Id the value starts with "/" it matched path in url only.
     * otherwise it matches host and path.
     * If the port is provided, it matches port too. To match on http/https default ports provide them in string(e.g. http://example.com:80)
     * If http/https is not provided, it will match on both.
     * If the value is an array, the rule will apply to all domains in the array.
     * Letter case is ignored
     * */
    domain: string | [string];

    /** If true, disables chat functionality, chat plugin will not render */
    disable?: boolean;
}
