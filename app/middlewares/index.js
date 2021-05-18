export const requestLogger = (req, res, next) => {
  const { method, url } = req;

  console.log(`${method} ${url}`);
  next();
};

export const errorHandler = (err, req, res, next) => {
  const { status, message } = err;

  res.status(status).send(message);
};
