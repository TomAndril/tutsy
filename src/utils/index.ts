const getFirstWord = (str: string) => {
  return str.split(" ")[0];
};

const getFirstLetter = (str: string) => {
  return str[0];
};

const getVideoId = (url: string) => {
  const urlParts = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  const id =
    urlParts[2] !== undefined
      ? urlParts[2].split(/[^0-9a-z_\-]/i)[0]
      : urlParts[0];

  return id;
};

const extractIdFromUrl = (url: string) => {
  const directFormat = url.split("v=")[1];
  const shortFormat = url.split("youtu.be/")[1]?.split("?")[0];
  const longFormat = url.split("&")[0];

  if (shortFormat) {
    return shortFormat;
  }

  if (longFormat) {
    return longFormat.split("v=")[1];
  }

  return directFormat;
};

export const secondsToMinutes = (seconds: number) => {
  if (seconds === 0) return "Start";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

export const secondsToHoursAndMinutes = (seconds: number) => {
  if (seconds === 0) return "Start";

  const hours = Math.floor(seconds / 3600);
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${remainingSeconds}`;
};

export const calculatePercentage = (
  partialValue: number,
  totalValue: number
) => {
  return (100 * partialValue) / totalValue;
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export { getFirstWord, getFirstLetter, getVideoId, extractIdFromUrl };
