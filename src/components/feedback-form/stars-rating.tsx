import React from "react";
import { StarEmpty, StarFilled } from "../icons";

interface StarsRatingProps {
    text: string;
    color: string;
    rating: number;
    onChange: (rating: number) => void;
    highlighted?: boolean;
}

export const StarsRating: React.FC<StarsRatingProps> = ({ text, color, rating, onChange, highlighted }) => {
    const [hoveredStar, setHoveredStar] = React.useState(0);

    const getStarWrapperStyle = (star: number) => ({
        width: highlighted ? "60px" : "40px",
        opacity: star <= hoveredStar ? 0.7 : 1,
    });

    return (
        <>
            <div style={{ marginTop: "15px" }}>{text}</div>
            <div style={{ display: "flex" }}>
                {Array.of(1, 2, 3, 4, 5).map((star) => (
                    <div
                        key={star}
                        onClick={() => onChange(star)}
                        style={getStarWrapperStyle(star)}
                        onMouseOver={() => setHoveredStar(star)}
                        onMouseOut={() => setHoveredStar(0)}
                    >
                        {star <= rating ? <StarFilled color={color} /> : <StarEmpty color={color} />}
                    </div>
                ))}
            </div>
        </>
    );
};
