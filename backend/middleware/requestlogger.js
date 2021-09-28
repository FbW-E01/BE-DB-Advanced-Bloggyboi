const requestlogger = (req, res, next) => {
  if (req.path.indexOf("favicon") === -1) {
    console.log(`[REQ] ${req.method} ${req.path}`);
  }
  next();
};

export default requestlogger;
