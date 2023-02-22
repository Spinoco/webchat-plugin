import { ConfigurationInterface } from "../models/interfaces/configuration/configuration-interface";
import React from "react";
import { Comment } from "./icons";
import { createTriggerCSSProperties } from "../models/styles/create-trigger-css-properties";
import Lottie from "lottie-react";
import { config } from "../config/config";

interface TriggerProps {
    configuration: ConfigurationInterface;
    setOpened: (e: boolean) => void;
}

export const Trigger: React.FC<TriggerProps> = ({ configuration, setOpened }) => {
    return (
        <div
            style={createTriggerCSSProperties(configuration)}
            onClick={() => {
                setOpened(true);
            }}
            className="swp-trigger"
        >
            {configuration.trigger?.icon?.lottie !== undefined ? (
                <Lottie animationData={configuration.trigger.icon.lottie} />
            ) : (
                <>
                    {configuration.trigger?.icon?.base64 ? (
                        <img src={configuration.trigger.icon.base64} alt="" />
                    ) : (
                        <Comment
                            color={
                                configuration.trigger?.icon?.color
                                    ? configuration.trigger.icon.color
                                    : config.styleProperties.trigger.icon.color
                            }
                        />
                    )}
                </>
            )}
        </div>
    );
};
