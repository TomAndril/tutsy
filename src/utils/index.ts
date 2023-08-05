const getFirstWord = (str: string) => {
  return str.split(" ")[0];
};

const getFirstLetter = (str: string) => {
  return str[0];
};

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export { getFirstWord, getFirstLetter, capitalize };
