const errorHandler = (err, req, res) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: 'Something went wrong',
    data: err.message,
  });
};

export default errorHandler;
