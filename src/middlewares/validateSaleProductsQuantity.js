module.exports = async (request, response, next) => {
  const { quantity } = request.body;
  if (!quantity) {
    return response.status(400).json({ message: '"quantity" is required' });
  } if (quantity <= 0) {
    return response.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};