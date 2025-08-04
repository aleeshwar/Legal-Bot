// --------------- import libraries ---------------
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();
const ChatSession = require('./models/ChatSession'); // Chat session model

// --------------- app setup ---------------
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --------------- connect to MongoDB ---------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// --------------- create User model ---------------
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});
const User = mongoose.model("User", userSchema);

// --------------- test route ---------------
app.get("/", (req, res) => {
  res.send("Backend server is up and running! 🚀");
});

// --------------- sign-in route to store email ---------------
app.post("/api/signin", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is missing from the request" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    res.json({ message: "User signed in successfully", email: user.email });
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    res.status(500).json({ error: "Failed to sign in user" });
  }
});

// --------------- main query route to call Colab RAG model ---------------
app.post("/api/query", async (req, res) => {
  const { query, email } = req.body;

  if (!query || !email) {
    return res.status(400).json({ error: "Query or email is missing from the request" });
  }

  const colabUrl = process.env.COLAB_SERVER_URL;
  if (!colabUrl) {
    return res.status(500).json({ error: "Colab RAG server URL is not configured in .env" });
  }

  try {
    // ✅ Send the request with proper field: 'question' not 'query'
    const response = await axios.post(`${colabUrl}/rag-query`, { question: query }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const ragAnswer = response?.data?.answer;

    if (!ragAnswer || typeof ragAnswer !== "string") {
      return res.status(500).json({ error: "Invalid response received from RAG model" });
    }

    const newSession = new ChatSession({
      email,
      query,
      response: ragAnswer
    });
    await newSession.save();
    console.log("✅ Chat session saved to MongoDB");

    res.json({ response: ragAnswer });

  } catch (error) {
    console.error("❌ Error fetching response from Colab:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from RAG model" });
  }
});

// --------------- start server ---------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});