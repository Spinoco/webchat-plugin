import React, { useEffect, useState } from "react";

interface ErrorMessageProps {
    message: string;
    show: boolean;
    onHide: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show, onHide }) => {
    const [cssClass, setCssClass] = useState<"" | "animate-in" | "animate-out">("");
    const [elementVisible, setElementVisible] = useState(false);

    useEffect(() => {
        if (!show) return;

        setElementVisible(true);
        setCssClass("animate-in");

        setTimeout(() => {
            setCssClass("animate-out");
        }, 3000);

        setTimeout(() => {
            setElementVisible(false);
            onHide();
        }, 4000);
    }, [show]);

    if (!elementVisible) {
        return <></>;
    }

    return <div className={`validation-error-message ${cssClass}`}>{message}</div>;
};
