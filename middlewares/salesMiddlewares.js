const { saleSchema } = require('../schemas/saleSchema');

// const validateSale = (req, _res, next) => {
//   const orders = req.body;
//   let result = null;

//   orders.some((order) => {
//     const { productId, quantity } = order;
//     const { error } = saleSchema.validate({ productId, quantity });
//     if (error) {
//       result = error;
//     }
//     return result;
//   });

//   console.log(result);
//   if (result) {
//     return next({ message: result.details[0].message });
//   }
//   next();
// };

const validateSale = (req, _res, next) => {
  const orders = req.body;
  const { error } = saleSchema.validate(orders);
  console.log(error);

  if (error) {
    const message = `"${(error.details[0].message).slice(5)}`;
    return next({ message });
  }
  next();
};

module.exports = {
  validateSale,
};
