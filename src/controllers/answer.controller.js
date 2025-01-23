import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const evaluateAnswer = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const { userId, question, answer } = req.body;
    const prompt = `${question}\nAnswer: ${answer}\n
        You are an IELTS test evaluator. Evaluate the answer and respond ONLY with a valid JSON object in this exact format:
        {
          "score": <number between 1-9>,
          "reason": "<detailed explanation>"
        }
        Do not include any other text or formatting.
        `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const data = JSON.parse(response.choices[0]?.message?.content);
    console.log(data);

    await prisma.response.create({
      data: {
        userId,
        question,
        transcript: answer,
        AIResponse: data?.reason || "",
        score: data?.score || 0,
      },
    });

    res.status(200).json({
      message: "Answer evaluated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
