// /backend/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send({
      mensaje: "Ocurrió un error en el servidor",
      detalles: err.message,
    });
};
