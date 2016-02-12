var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
var workoutSchema = new Schema({
    name : { type: String, required: true, trim: true, index: { unique: true } }, 
    description : { type: String, required: true }, 
    date_created : { type: Date, required: true, default: Date.now}
});

// Create actual model
var workout = mongoose.model('workout', workoutSchema);

module.exports = {
  Workout: workout
};