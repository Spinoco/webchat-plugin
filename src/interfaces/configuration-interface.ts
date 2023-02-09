import { RootInterface } from "./configuration/root-interface";
import { HeaderInterface } from "./configuration/header-interface";
import { BubbleInterface } from "./configuration/bubble-interface";
import { SendBoxInterface } from "./configuration/send-box-interface";
import { SuggestedActionInterface } from "./configuration/suggested-action-interface";
import { FeaturesInterface } from "./configuration/features-interface";

export interface ConfigurationInterface {
    header?: HeaderInterface;
    logoBase64?: string;
    primaryColor: string;
    primaryColorHover?: string;
    secondaryColor: string;
    accent?: string;
    subtle?: string;
    root?: RootInterface;
    bubble?: BubbleInterface;
    suggestedAction?: SuggestedActionInterface;
    sendBox?: SendBoxInterface;
    features?: FeaturesInterface;
}
