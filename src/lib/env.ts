function getEnv() {
  return process.env.NODE_ENV || "development";
}

function getHost() {
  const env = getEnv();

  if (env === "development") {
    return "http://localhost:3000";
  } else {
    return "https://www.tutsy.io";
  }
}

export { getEnv, getHost };
