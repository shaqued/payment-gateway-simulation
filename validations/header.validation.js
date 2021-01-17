export default (req, res, next, identifierHeader) => {
  if (!req.header(identifierHeader)) {
    res.sendStatus(400);
  } else {
    next();
  }
};