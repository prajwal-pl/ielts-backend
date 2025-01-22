import express from "express";
import { sendQuestionData } from "../controllers/question.controller.js";

const router = express.Router();

router.get("/questions", sendQuestionData);

export default router;
