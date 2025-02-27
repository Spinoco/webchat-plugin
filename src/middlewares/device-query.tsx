const fullScreenBreakpoint = 768; // this shall be in sync with the value in src/styles/app.scss

/**
 * Check if the device is mobile by running media query.
 */
export const isFullScreen = () => {
    // we are implementing this over match media as fullscreen is only if mobile break point is matched
    const queryString = `( max-width: ${fullScreenBreakpoint}px )`;
    const query = window.matchMedia(queryString);
    return query.matches;
};
