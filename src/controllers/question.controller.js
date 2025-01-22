import { questionSet } from "../lib/utils.js";

export const sendQuestionData = (req, res) => {
  try {
    const questions = questionSet;
    return res.status(200).json({
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching data",
      error: error.message,
    });
  }
};
