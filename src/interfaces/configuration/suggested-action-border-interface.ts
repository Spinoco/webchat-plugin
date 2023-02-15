import { StringEventInterface } from "./string-event-interface";
import { NumberEventInterface } from "./number-event-interface";

export interface SuggestedActionBorderInterface {
    color?: StringEventInterface;
    radius?: number | string;
    style?: StringEventInterface;
    width?: NumberEventInterface;
}
