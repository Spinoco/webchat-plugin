import { RatingInterface } from "./rating-interface";

export interface FeedbackConfigurationInterface {
    question?: {
        question?: string;
        placeholder?: string;
    };
    colors?: {
        primaryColor?: string;
    };
    ratings?: RatingInterface[];
}
