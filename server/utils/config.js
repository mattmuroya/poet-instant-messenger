require("dotenv").config();

const PORT = process.env.PORT;
// const MONGODB_URL =
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "productionDb"
//     ? process.env.MONGODB_URL
//     : process.env.MONGODB_URL_TEST;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
  PORT,
  MONGODB_URL,
};
