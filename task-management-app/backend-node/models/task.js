//Import mongoose to define the schema
const mongoose = require('mongoose');

//Define the schema for the task
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true}, //task title is a required string
    completed: { type: Boolean, default: false}, // Completed task status, default is set to false.
});

//Export the model to interact with the tasks collection in the MongoDB

module.exports = mongoose.model('Task', taskSchema);