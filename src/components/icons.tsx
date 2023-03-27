import React from "react";

interface Icon {
    color?: string;
}

export const Close: React.FC<Icon> = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill={color}>
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
    );
};

export const Comment: React.FC<Icon> = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={color}>
            <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
        </svg>
    );
};

export const Send: React.FC<Icon> = ({ color }) => {
    return (
        <svg viewBox="0 0 800 704" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M266.198 690.076C266.198 694.869 268.86 699.265 273.092 701.505C277.322 703.743 282.465 703.456 286.418 700.749L375.451 639.955L266.2 587.883V690.076H266.198Z"
                fill={color}
            />
            <path
                d="M795.843 4.43281C793.398 2.17828 790.242 0.998489 787.051 0.998489C785.128 0.998489 783.21 1.42515 781.395 2.31727L12.7757 379.346C4.91957 383.207 -0.0517103 391.23 0.00162271 400.005C0.0549557 408.77 5.11028 416.737 13.023 420.513L215.595 517.036L620.635 184.125L265.784 540.948L518.138 661.19C521.238 662.675 524.622 663.414 527.971 663.414C530.828 663.414 533.658 662.893 536.352 661.835C542.23 659.511 546.901 654.856 549.233 648.977L799.084 18.6776C801.062 13.7176 799.772 8.04653 795.843 4.43281Z"
                fill={color}
            />
        </svg>
    );
};
