import createHttpError from 'http-errors';

const notFoundHandler = (req, resizeBy, next) => {
  next(createHttpError(404, 'Route not found'));
};

export default notFoundHandler;
