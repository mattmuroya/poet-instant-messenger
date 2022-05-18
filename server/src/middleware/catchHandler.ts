export default (_req, res) => {
  res.status(404).json({
    error: "Unknown endpoint.",
  });
};
