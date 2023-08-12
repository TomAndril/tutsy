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

export { getFirstWord, getFirstLetter, capitalize, getVideoId };
