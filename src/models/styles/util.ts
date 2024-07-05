/**
 * Converts pixels to rem value at the base font size of 16px of single rem.
 * Allows to specify relative sizes based ont he desktop sizes
 * @param pixels
 */
export const rem = (pixels: number): string => `${pixels / 16}rem`;
