module.exports = async (request, response, next) => {
  const { productId } = request.body;
  if (!productId) {
    return response.status(400).send({ message: '"productId" is required' });
  } if (productId.length < 5) {
    return response
      .status(422).send({ message: '"name" length must be at least 5 characters long' });
  } next();
};