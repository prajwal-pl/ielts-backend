import express from "express";
import { sendQuestionData } from "../controllers/question.controller.js";
import { evaluateAnswer } from "../controllers/answer.controller.js";

const router = express.Router();

router.get("/questions", sendQuestionData);
router.post("/answers", evaluateAnswer);

export default router;
