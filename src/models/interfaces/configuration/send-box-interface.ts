import { SendBoxButtonInterface } from "./send-box-button-interface";
import { SendBoxBorderInterface } from "./send-box-border-interface";
import { SendBoxButtonCSSInterface } from "./send-box-button-css-interface";

export interface SendBoxInterface {
    background?: string;
    color?: string;
    height?: number | string;
    margin?: string;
    button?: SendBoxButtonInterface;
    border?: SendBoxBorderInterface;
    upload?: SendBoxButtonCSSInterface;
    send?: SendBoxButtonCSSInterface;
}
