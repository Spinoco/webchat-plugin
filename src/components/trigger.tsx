import { ConfigurationInterface } from "../models/interfaces/configuration/configuration-interface";
import React from "react";
import { Comment } from "./icons";
import { createTriggerCSSProperties } from "../models/styles/create-trigger-css-properties";
import { config } from "../config/config";
const LottieTrigger = React.lazy(() => import("./trigger/lottie-trigger"));

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
            {configuration.trigger?.icon?.lottie?.data !== undefined ||
            configuration.trigger?.icon?.lottie?.url !== undefined ? (
                <LottieTrigger
                    url={configuration.trigger.icon.lottie.url}
                    data={configuration.trigger.icon.lottie.data}
                />
            ) : (
                <>
                    {configuration.trigger?.icon?.base64 !== undefined ||
                    configuration.trigger?.icon?.url !== undefined ? (
                        <img
                            src={
                                configuration.trigger.icon.base64
                                    ? configuration.trigger.icon.base64
                                    : configuration.trigger.icon.url
                            }
                            alt=""
                        />
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
