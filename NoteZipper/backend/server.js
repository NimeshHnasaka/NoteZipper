const express = require("express");
const notes = require("./data/notes");
const dotenv = require('dotenv')
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const connectDB = require('./Config/db');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

connectDB();


const app = express();
app.use(express.json());








app.get('/', (req, res) => {
    res.send("API is running...");
});

app.get('/api/notes', (req, res) => {
    res.send(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const note = notes.find((n) => n._id === req.params.id);
    console.log(req.params);
    res.send(note);
});


app.use('/api/users',userRoutes);
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});