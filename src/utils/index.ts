const getFirstWord = (str: string) => {
  return str.split(" ")[0];
};

const getFirstLetter = (str: string) => {
  return str[0];
};

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

const getVideoId = (url: string) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  }
  return videoId;
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

export { getFirstWord, getFirstLetter, capitalize, getVideoId };
