export interface RuleInterface {
    /** Domain for which this rule applies. Id the value starts with "/" it matched path in url only.
     * otherwise it matches host and path.
     * If the value is an array, the rule will apply to all domains in the array.
     * Comparions is case insensitive.
     * */
    domain: string | [string];

    /** If true, disables chat functionality, chat plugin will not render */
    disable?: boolean;
}
