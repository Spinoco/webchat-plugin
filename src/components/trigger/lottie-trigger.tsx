import React from "react";
import Lottie from "react-lottie-player";

interface LottieTriggerProps {
    url?: string;
    data?: object;
}

export const LottieTrigger: React.FC<LottieTriggerProps> = ({ url, data }) => {
    return <Lottie path={url} animationData={data} play={true} loop={true} />;
};

export default LottieTrigger;
