const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/getChatCompletion", async (req, res) => {
  const messages = req.body.requestData;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // messages: [
      //   {
      //     role: "system",
      //     content: "You are a devil's advocate.",
      //   },
      //   {
      //     role: "user",
      //     content: req.body.message,
      //   },
      // ],
      messages: req.body.messages,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

