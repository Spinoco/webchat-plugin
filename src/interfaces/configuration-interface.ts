import { RootInterface } from "./configuration/root-interface";
import { HeaderInterface } from "./configuration/header-interface";
import { BubbleInterface } from "./configuration/bubble-interface";
import { SendBoxInterface } from "./configuration/send-box-interface";

export interface ConfigurationInterface {
    // Custom
    header?: HeaderInterface;
    logoBase64?: string;
    primaryColor: string;
    secondaryColor: string;

    // Color and paddings
    accent?: string;
    subtle?: string;

    root?: RootInterface;
    bubble?: BubbleInterface;
    sendBox?: SendBoxInterface;
}
