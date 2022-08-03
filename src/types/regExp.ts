export const LettersAndNumbersEnUa = new RegExp("^[a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐ\\sґ0-9'_.-]*$");
export const OnlyNumbers = new RegExp('^[0-9]*$');
export const NumbersAndLettersEn = new RegExp('^[a-zA-Z0-9-]*$');
export const FiveSymbolOnlyNumbers = new RegExp('^\\d{1,5}$');
// eslint-disable-next-line max-len
export const Email = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
