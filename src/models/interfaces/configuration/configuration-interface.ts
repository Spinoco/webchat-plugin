import { RootInterface } from "./root-interface";
import { HeaderInterface } from "./header-interface";
import { BubbleInterface } from "./bubble-interface";
import { SendBoxInterface } from "./send-box-interface";
import { SuggestedActionInterface } from "./suggested-action-interface";
import { FeaturesInterface } from "./features-interface";
import { TriggerInterface } from "./trigger-interface";
import { TypingIndicatorInterface } from "./typing-indicator-interface";
import { AvatarInterface } from "./avatar-interface";
import { DirectLineInterface } from "./direct-line-interface";
import { LoaderInterface } from "./loader-interface";
import { PopoverInterface } from "./popover/popover-interface";

export interface ConfigurationInterface {
    directLine: DirectLineInterface;
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
    loader?: LoaderInterface;
    popover?: PopoverInterface;
}
