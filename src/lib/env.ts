function getEnv() {
  return process.env.NODE_ENV || "development";
}

function getHost() {
  const env = getEnv();

  console.log(env);

  if (env === "development") {
    return "http://localhost:3000";
  } else if (env === "test") {
    return "https://tuti-test.vercel.app/";
  }
}

export { getEnv, getHost };
