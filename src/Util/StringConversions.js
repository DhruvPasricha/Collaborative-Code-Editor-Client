export const dashCaseToPascalCaseWithSpaces = (str) => {
    if (typeof(str) !== "string") {
        return str;
    }
    return str
        .replace(/(_\w)/g, (match) => " " + match[1].toUpperCase())
        .replace(/_/g, "")
        .replace(/^\w/, (match) => match.toUpperCase());
};
