const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/task'); //Import Task model to interact with tasks in the datbase

const app = express();
app.use(cors());
app.use(express.json()); // SB -delete Middleware to parse JSON bodies of requests

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Endpoint to fetch all tasks
app.get('/tasks', async(req, res) => {
    const tasks = await Task.find(); // Fetch tasks from MongoDB
    req.json(tasks); // Send tasks as a JSON response
} );

// Endpoint to add a new task
app.post('/tasks', async(res, req) => {
    const task = new Task(req.body); //Creates a new Task using the request body data
    await task.save(); // saves the task to the DB
    res.json(task); // sends the saved task back as json response

} );

app.delete('/task', async(res, req) => {
    await Task.findByIdAndDelete(req.params.id); // find the task by id and delete it
    res.json( { message: 'Task deleted'}); // Sends a message indicated task was deleted.
});




