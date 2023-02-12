export function customerValidation(schema) {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body, { abortEarly: false });

      res.locals.value = value;
      next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}
