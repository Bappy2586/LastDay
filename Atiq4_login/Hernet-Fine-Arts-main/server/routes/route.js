import express from "express";
import passport from "../controller/passport.js";
import {
  welcome,
  register,
  login,
  profile,
  notFound,
  errorHandler,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", welcome);
router.post("/register", register);
router.post("/login", login);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);

// 404 and error handlers (should be last!)
router.use(notFound);
router.use(errorHandler);

export default router;