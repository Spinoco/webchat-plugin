export const getBase64Prefix = (source?: string): string => {
    return "data:image/jpeg;base64, " + source;
};
