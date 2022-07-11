const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  let customError = {
    statusCode: statusCode || 500,
    message: error.message || 'Something went wrong. Try again later.',
  }
  if (error.name === 'ValidationError') {
    customError.message = Object.values(error.errors)
      .map((e) => e.message)
      .join(', ')
    customError.statusCode = 400
  }
  //Validate Error
  if (error.code === 11000) {
    customError.message = `This ${Object.keys(error.keyPattern)} already exists`
    customError.statusCode = 400
  }

  //Cast Error
  if (error.name === 'CastError') {
    customError.message = `No data found with id: ${error.value}`
    customError.statusCode = 404
  }

  res.status(customError.statusCode)
  res.json({
    message: customError.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })
}

export { notFound, errorHandler }
