import { RootInterface } from "./root-interface";
import { HeaderInterface } from "./header-interface";
import { BubbleInterface } from "./bubble-interface";
import { SendBoxInterface } from "./send-box-interface";
import { SuggestedActionInterface } from "./suggested-action-interface";
import { FeaturesInterface } from "./features-interface";
import { TriggerInterface } from "./trigger-interface";
import { TypingIndicatorInterface } from "./typing-indicator-interface";
import { AvatarInterface } from "./avatar-interface";

export interface ConfigurationInterface {
    primaryColor: string;
    secondaryColor: string;
    primaryColorHover?: string;
    borderColor?: string;
    subtle?: string;
    trigger?: TriggerInterface;
    header?: HeaderInterface;
    root?: RootInterface;
    bubble?: BubbleInterface;
    bubbleFromUser?: BubbleInterface;
    avatar?: AvatarInterface;
    typingIndicator?: TypingIndicatorInterface;
    suggestedAction?: SuggestedActionInterface;
    sendBox?: SendBoxInterface;
    features?: FeaturesInterface;
}
