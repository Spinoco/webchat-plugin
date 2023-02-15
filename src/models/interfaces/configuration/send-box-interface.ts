import { SendBoxButtonInterface } from "./send-box-button-interface";
import { SendBoxBorderInterface } from "./send-box-border-interface";

export interface SendBoxInterface {
    background?: string;
    color?: string;
    height?: number | string;
    button?: SendBoxButtonInterface;
    border?: SendBoxBorderInterface;
}
