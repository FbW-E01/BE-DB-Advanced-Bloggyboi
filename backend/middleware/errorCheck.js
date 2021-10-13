import { validationResult } from "express-validator";

/*
 * This function takes in validation rules and checks them.
 *
 * If a validation error is found, it stops the current request-response cycle
 * and responds with a 400 error and easily understandable validation error
 * messages for the client.
 *
 * @param {rules} Set of validation sanitation middlewares (expresss-validator)
 */
function errorCheck(rules) {
  const middlewares = [...rules];

  middlewares.push((req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors.map((e) => e.msg) });
    }

    next();
  });

  return middlewares;
}

export default errorCheck;
