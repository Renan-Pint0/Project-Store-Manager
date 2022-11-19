module.exports = async (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).send({ message: '"name" is required' });
  } if (name.length < 5) {
    return response
      .status(422).send({ message: '"name" length must be at least 5 characters long' });
  } next();
};