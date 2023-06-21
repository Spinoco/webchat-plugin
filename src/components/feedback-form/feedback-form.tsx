import { ConfigurationInterface } from "../../models/interfaces/configuration/configuration-interface";
import React, { useState } from "react";
import { config } from "../../config/config";
import { createChatBoxWrapperCssVariables } from "../../models/styles/create-chat-box-wrapper-css-variables";
import { Header } from "../header";
import { ErrorMessage } from "./error-message";
import { StarsRating } from "./stars-rating";
import { FeedbackConfigurationInterface } from "../../models/interfaces/configuration/feedback-configuration-interface";
import { RatingInterface } from "../../models/interfaces/configuration/rating-interface";

interface Rating extends RatingInterface {
    rating: number;
}

interface FeedbackFormProps {
    configuration: ConfigurationInterface;
    feedbackConfiguration: FeedbackConfigurationInterface;
    clientId: string;
    onClose: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
    configuration,
    feedbackConfiguration,
    clientId,
    onClose,
}) => {
    const [ratings, setRatings] = useState<Rating[]>(() => {
        return (
            feedbackConfiguration.ratings?.map((rating) => ({
                ...rating,
                rating: 0,
            })) ?? []
        );
    });
    const [furtherRemarks, setFurtherRemarks] = useState<string>("");
    const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);

    const { header } = configuration;
    const logoSrc = header?.logo?.base64 ?? header?.logo?.url;

    const changeRating = (rating: number, id: string) => {
        const newRatings = [...ratings];
        const ratingToChange = newRatings.find((rating) => rating.id === id);
        if (ratingToChange) {
            ratingToChange.rating = rating;
        }
        setRatings(newRatings);
    };

    const submit = () => {
        const overAllRating = ratings.find((rating) => rating.id === "overall");
        if (overAllRating?.rating === 0) {
            setShowValidationErrorMessage(true);
            return;
        }
        onClose();
    };

    return (
        <div className={config.classes.chatBoxWrapper} style={createChatBoxWrapperCssVariables(true)}>
            <Header clientId={clientId} configuration={configuration} onClose={onClose} />
            <div className="feedback-form-wrapper">
                {logoSrc && (
                    <div className="img-logo-wrapper">
                        <img src={logoSrc} alt={clientId} />
                    </div>
                )}
                {ratings.map((ratingItem) => (
                    <StarsRating
                        key={ratingItem.id}
                        text={ratingItem.text}
                        color={configuration.primaryColor}
                        rating={ratingItem.rating}
                        onChange={(rating) => changeRating(rating, ratingItem.id)}
                        highlighted={ratingItem.id === "overall"}
                    />
                ))}
                <div className="question">{feedbackConfiguration.question?.question}</div>
                <textarea
                    placeholder={feedbackConfiguration.question?.placeholder}
                    value={furtherRemarks}
                    onChange={(event) => setFurtherRemarks(event.target.value)}
                />
                <ErrorMessage
                    message="Please rate overall rating"
                    show={showValidationErrorMessage}
                    onHide={() => setShowValidationErrorMessage(false)}
                />
                <button
                    className="submit-button"
                    style={{ background: configuration.primaryColor }}
                    onClick={() => submit()}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};
