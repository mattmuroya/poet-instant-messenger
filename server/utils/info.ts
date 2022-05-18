export default (...params: any) => {
  if (process.env.NODE_ENV === "test") console.log(...params);
};
