/**
 * Kind of the interaction that shall be performed with the user, when a webchat context
 * is handed over to the plugin.
 */
export enum WebchatContextKind {
    /** Ask the question of the context and let the user answer it with yes / no. */
    YesNo = "YesNo",
}
