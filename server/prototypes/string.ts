
const decode = require('html-entities').decode;

declare interface String {
    toUpperCaseFirst(): string;
    decodeEntities(): string;
}

String.prototype.toUpperCaseFirst = function (): string {
    let s = this;
    if (s.length > 1 && s.charAt(0)) {
        const firstChar = s.charAt(0).toUpperCase();
        const restChars = s.slice(1, s.length);
        return firstChar + restChars;
    } else {
        return s.toString();
    }
};


String.prototype.decodeEntities = function (): string {
    let s = this;
    return decode(s);
};