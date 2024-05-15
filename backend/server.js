const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const storiesRouter = require('./controllers/stories');
const commentsRouter = require('./controllers/comments');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const main = require('./src/frontend/main');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/stories', storiesRouter);
app.use('/stories', commentsRouter);

app.get('/', (_req, res) => {
    // Render the Main component to HTML
    const html = ReactDOMServer.renderToString(React.createElement(Main));

    res.send(html);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
