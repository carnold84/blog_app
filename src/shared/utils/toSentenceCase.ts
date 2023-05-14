const toSentenceCase = (value: string) => {
  return value
    .split(" ")
    .map((string: string) => {
      return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    })
    .join(" ");
};

export default toSentenceCase;
