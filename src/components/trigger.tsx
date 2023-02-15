import { ConfigurationInterface } from "../models/interfaces/configuration-interface";
import React from "react";
import { Comment } from "./icons";
import { createTriggerCSSProperties } from "../models/styles/create-trigger-css-properties";

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
            {configuration.trigger?.iconBase64 ? (
                <img src={configuration.trigger.iconBase64} alt="" />
            ) : (
                <Comment color={configuration.trigger?.iconColor ? configuration.trigger.iconColor : "white"} />
            )}
        </div>
    );
};
