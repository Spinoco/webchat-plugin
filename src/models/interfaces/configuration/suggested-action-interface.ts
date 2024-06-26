import { SuggestedActionBorderInterface } from "./suggested-action-border-interface";

export interface SuggestedActionInterface {
    layout?: "carousel" | "stacked" | "flow";
    height?: number | string;
    imageHeight?: number | string;
    textColor?: string;
    textColorOnHover?: string;
    background?: string;
    backgroundOnHover?: string;
    border?: SuggestedActionBorderInterface;
}
