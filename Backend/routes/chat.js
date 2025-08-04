// routes/chat.js
const express = require('express');
const ChatSession = require('../models/ChatSession');
const User = require('../models/User');
const router = express.Router();

// Save chat session
router.post('/chat', async (req, res) => {
  const { userId, messages } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newChatSession = new ChatSession({ userId, messages });
    await newChatSession.save();
    res.status(201).json({ message: 'Chat session saved', chatSession: newChatSession });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat history by user
router.get('/chat-history/:userId', async (req, res) => {
  try {
    const chatSessions = await ChatSession.find({ userId: req.params.userId }).populate('userId', 'username email');
    res.json({ chatSessions });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat history' });
  }
});

module.exports = router;
