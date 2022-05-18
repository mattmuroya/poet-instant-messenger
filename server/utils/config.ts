import dotenv from "dotenv";
dotenv.config();

let PORT: string = "";
let DB: string = "";

if (process.env.PORT) {
  PORT = process.env.PORT;
}

if (process.env.NODE_ENV !== "production") {
  if (process.env.DB_TEST) DB = process.env.DB_TEST;
}

export default {
  PORT,
  DB,
};
