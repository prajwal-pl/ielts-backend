import express from "express";
import { sendQuestionData } from "../controllers/question.controller.js";
import {
  evaluateAnswer,
  sendEvaluationData,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.get("/questions", sendQuestionData);
router.post("/answers", evaluateAnswer);
router.get("/answers/:userId", sendEvaluationData);

export default router;
