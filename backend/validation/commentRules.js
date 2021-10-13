import { body, param } from "express-validator";

// These validators and sanitizers are for creating new comments
const commentRules = [
  body("author").exists().withMessage("author-required"),
  body("author").isEmail().withMessage("author-email"),
  body("author").normalizeEmail(), // Sanitizes email, no validation message!
  body("author").isLength({ min: 3 }).withMessage("author-minlength"),
  body("content").exists().withMessage("content-required"),
  body("content").trim().blacklist("abcde"), // Sanitizes content, no validation message!
  body("content").isLength({ min: 3 }).withMessage("content-minlength"),
  param("postId").exists().withMessage("postid-required"),
  param("postId").isMongoId().withMessage("postid-valid-mongo-id"),
];

export default commentRules;