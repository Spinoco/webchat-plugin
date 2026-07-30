import React, { useEffect, useRef } from "react";
import { config } from "../config/config";

const QUESTION_ELEMENT_ID = "swp-question-dialog-question";

interface QuestionDialogProps {
    question: string;
    /** Label of the confirming button, defaults to the one from the configuration. */
    yesLabel?: string;
    /** Label of the dismissing button, defaults to the one from the configuration. */
    noLabel?: string;
    onYes: () => void;
    onNo: () => void;
}

/**
 * Dialog that asks the user a question that is answered by yes / no.
 *
 * It is displayed over the chat window it is rendered in. Styled by
 * `styles/components/question-dialog.scss`, which takes the primary color and the radius of the
 * plugin from its css variables, so the dialog needs no style properties of its own.
 */
export const QuestionDialog: React.FC<QuestionDialogProps> = ({ question, yesLabel, noLabel, onYes, onNo }) => {
    const confirmButton = useRef<HTMLButtonElement>(null);

    // the dialog interrupts the user, so it takes the focus over and can be dismissed by escape
    useEffect(() => {
        confirmButton.current?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onNo();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div className="swp-question-dialog" role="dialog" aria-modal="true" aria-labelledby={QUESTION_ELEMENT_ID}>
            <div className="swp-question-dialog-card">
                <h3 id={QUESTION_ELEMENT_ID}>{question}</h3>

                <div className="swp-question-dialog-actions">
                    <button className="swp-question-dialog-dismiss" onClick={onNo}>
                        {noLabel ?? config.questionDialog.noLabel}
                    </button>

                    <button ref={confirmButton} className="swp-question-dialog-confirm" onClick={onYes}>
                        {yesLabel ?? config.questionDialog.yesLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
