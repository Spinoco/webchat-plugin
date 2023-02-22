import { TriggerIconInterface } from "./trigger-icon-interface";

export interface TriggerInterface {
    height?: number | string;
    width?: number | string;
    zIndex?: number;
    background?: string;
    border?: string;
    borderRadius?: string;
    icon?: TriggerIconInterface;
}
