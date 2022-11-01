exports.response = (res, stat, mess, result) => {
  res.send({
    status: stat,
    message: mess,
    result: result,
  });
};
