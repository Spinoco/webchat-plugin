import { RootInterface } from "./configuration/root-interface";
import { HeaderInterface } from "./configuration/header-interface";

export interface ConfigurationInterface {
    // Custom
    header?: HeaderInterface;
    logo?: string;
    primaryColor: string;
    secondaryColor: string;

    // Color and paddings
    accent?: string;
    subtle?: string;

    // Root
    root?: RootInterface;

    // Bubble
    bubbleBorderWidth?: number;
    bubbleBorderColor?: string;

    // Send box
    sendBoxBackground: string;
    sendBoxHeight?: number | string;
    sendBoxButtonColor?: string;
    sendBoxButtonShadeInset?: number;
}
