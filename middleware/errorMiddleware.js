const notFound = (req, res, next) => {
  const error = new Error("Not found: " + req.originalUrl);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let message = error.message;
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({ message });
};

export { notFound, errorHandler };
