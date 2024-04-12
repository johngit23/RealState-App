import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  shouldBeAdmin,
  shouldBeLoggedin,
} from "../controllers/test.controller.js";

const router = express.Router();

router.get("/should-be-loggedin", verifyToken, shouldBeLoggedin);

router.get("/should-be-admin", shouldBeAdmin);

export default router;
