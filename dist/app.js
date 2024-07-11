"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const commentsRouter = require('./controllers/comments');
const stories_1 = __importDefault(require("./routes/stories"));
require('dotenv').config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Routes
app.use('/stories', stories_1.default);
// app.use('/stories', commentsRouter);
// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
