export const isDigit = (c: string) => {
  return /^\d$/g.test(c);
};

export const isAlpha = (c: string) => {
  return /^[\w]$/g.test(c);
};

export const isAlphaNumeric = (c: string) => {
  return isAlpha(c) || isDigit(c);
};

export const getNthLine = (text: string, lineNumber: number) => {
  const lines = text.split(/\r?\n/);
  if (lineNumber <= 0 || lineNumber > lines.length) {
    return undefined;
  }
  return lines[lineNumber - 1];
};
