export function returnDateValidation() {
  return async (res, next) => {
    const { rentalData } = res.locals;
    try {
      if (!rentalData.returnDate) {
        return res.sendStatus(400);
      }

      next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  };
}
