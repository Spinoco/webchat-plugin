import { RootInterface } from "./configuration/root-interface";
import { HeaderInterface } from "./configuration/header-interface";
import { BubbleInterface } from "./configuration/bubble-interface";
import { SendBoxInterface } from "./configuration/send-box-interface";
import { SuggestedActionInterface } from "./configuration/suggested-action-interface";
import { FeaturesInterface } from "./configuration/features-interface";
import { TriggerInterface } from "./configuration/trigger-interface";
import { TypingIndicatorInterface } from "./configuration/typing-indicator-interface";

export interface ConfigurationInterface {
    primaryColor: string;
    primaryColorHover?: string;
    secondaryColor: string;
    borderColor?: string;
    accent?: string;
    subtle?: string;
    trigger?: TriggerInterface;
    root?: RootInterface;
    header?: HeaderInterface;
    bubble?: BubbleInterface;
    bubbleFromUser?: BubbleInterface;
    typingIndicator?: TypingIndicatorInterface;
    suggestedAction?: SuggestedActionInterface;
    sendBox?: SendBoxInterface;
    features?: FeaturesInterface;
}
