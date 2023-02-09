import { SendBoxButtonInterface } from "./send-box-button-interface";

export interface SendBoxInterface {
    background: string;
    height?: number | string;
    button?: SendBoxButtonInterface;
}
