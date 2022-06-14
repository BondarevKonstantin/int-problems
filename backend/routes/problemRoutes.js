import express from "express"

import {
  getProblems,
  getProblemsById,
  deleteProblem,
  updateProblem,
  createProblem,
} from "../controllers/problemController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getProblems).post(protect, admin, createProblem)
router
  .route("/:id")
  .get(getProblemsById)
  .delete(protect, admin, deleteProblem)
  .put(protect, admin, updateProblem)

export default router