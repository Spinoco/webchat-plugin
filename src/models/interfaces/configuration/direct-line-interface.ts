export interface DirectLineInterface {
    /** secret for the direct line */
    secret?: string;
    /** domain for the direct line (europe/india) */
    domain?: string;
    /** true if the mockobt should be used */
    useMockbot?: boolean;
}
