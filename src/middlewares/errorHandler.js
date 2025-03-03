const errorHandler = (err, req, res) => {
  console.error('❌ Error:', err);

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Something went wrong',
  });
};

export default errorHandler;
