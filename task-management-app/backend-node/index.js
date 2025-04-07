const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/task'); //Import Task model to interact with tasks in the datbase

const app = express();
app.use(cors());
app.use(express.json()); 


// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log('MongoDB is running and connected successfully!');
    })
    .catch((err) => {
        console.err('Error connecting to MongoDB.', err);
});

//Endpoint to fetch all tasks
app.get('/tasks', async(req, res) => {
    const tasks = await Task.find(); // Fetch tasks from MongoDB
    res.json(tasks); // Send tasks as a JSON response
});

// Endpoint to add a new task
app.post('/tasks', async(req, res) => {
    try{
        const task = new Task(req.body); //Creates a new Task using the request body data
        await task.save(); // saves the task to the DB
        res.status(201).json(task); // sends the saved task back as json response
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task', details: err.message});
    }

});

app.delete('/tasks/:id', async(req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id); // find the task by id and delete it
        if (!task) {
            return res.status(404).json({ error: 'Task not found'});
        }
        res.json( { message: 'Task deleted'}); // Sends a message indicated task was deleted.
    } catch (err) {
        res.status(500).json({ err: 'Failed to delete task', details: err.message});
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000'); // Log the server URL when running
});




