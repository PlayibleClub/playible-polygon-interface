export const truncate = (fullStr, strLen, separator = '...') => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator;

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = 6,
    backChars = Math.floor(charsToShow / 2);

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};
