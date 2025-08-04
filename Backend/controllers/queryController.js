// controllers/queryController.js
const ChatSession = require("../models/ChatSession");

const handleQuery = async (req, res) => {
  const { userId, query } = req.body;  // We assume `userId` is passed along with `query`.

  if (!userId || !query) {
    return res.status(400).json({ message: "User ID and query are required" });
  }

  try {
    // Step 1: Find or create a new chat session for the user.
    let chatSession = await ChatSession.findOne({ userId }).sort({ _id: -1 }).limit(1); // Fetch the latest chat session.

    if (!chatSession) {
      // If no session exists, create a new one
      chatSession = new ChatSession({
        userId,
        messages: [],
      });
      await chatSession.save();
    }

    // Step 2: Add the user's query to the chat session.
    chatSession.messages.push({
      from: "user",
      text: query,
      timestamp: new Date(),
    });

    // Step 3: Generate the bot's response (you can replace this with an AI call or predefined logic).
    const botResponse = `This is a bot response to: "${query}"`; // Simple static response

    // Step 4: Add the bot's response to the chat session.
    chatSession.messages.push({
      from: "bot",
      text: botResponse,
      timestamp: new Date(),
    });

    // Step 5: Save the updated chat session to the database.
    await chatSession.save();

    // Step 6: Return the chat session along with the answer
    res.status(200).json({ answer: botResponse, chatSession });
  } catch (error) {
    console.error("Error handling query:", error);
    res.status(500).json({ message: "Error processing the query" });
  }
};

module.exports = { handleQuery };
