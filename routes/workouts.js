var Workout = require('../models/workout').Workout;

// Query the workout collection
// Return all available workouts
exports.index = function(req, res) {
  Workout.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { workouts: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}

// Query for a specific workout
// Requires: id of workout to be supplied in the request.
exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the workout the user wants to look up.
  Workout.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading workout." + err});
    } else {
      res.json(404, { message: "Workout not found."});
    }
  });
}

// Add a workout to the workout collection
// 1) Search if workout with the same name exists.
// 2) If no duplicate, save.
exports.create = function(req, res) {
      
  var workout_name = req.body.workout_name; // Name of workout.
  var description = req.body.workout_description; // Description of the workout

// Case insensitive search for one match.
Workout.findOne({ name: { $regex: new RegExp(workout_name, "i") } },
	
	function(err, doc) { 
		//If no error & no document returned, create new document.
	    if(!err && !doc) {
	      
	      var newWorkout = new Workout();
	      
	      newWorkout.name = workout_name;
	      newWorkout.description = description;
	      
	      // One parameter, callback that is called after completion.
	      newWorkout.save(function(err) {
	      
	        if(!err) {
	          res.json(201, {message: "Workout created with name: " + newWorkout.name });
	        } else {
	          res.json(500, {message: "Could not create workout. Error: " + err});
	        }
	      });

	    } else if(!err) {
	      // User is trying to create a workout with a name that
	      // already exists.
	      res.json(403, {message: "Workout with that name already exists, please update instead of create or create a new workout with a different name."});
	      // If error during findOne for duplicate, return error message.
	    } else {
	      res.json(500, { message: err});
	    }
  });   
}

//Delete a workout given the workout id
exports.delete = function(req, res) {
      
  var id = req.body.id;
  Workout.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find workout."});
    } else {
      res.json(403, {message: "Could not delete workout. " + err});
    }
  });
}

//Update a workout with the given params:
// id
// name
// description
exports.update = function(req, res) {  
  var id = req.body.id;
  var workout_name = req.body.workout_name;
  var workout_description = req.body.workout_description;
      
  Workout.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = workout_name;
        doc.description = workout_description;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Workout updated: " + workout_name});
          } else {
            res.json(500, {message: "Could not update workout. " + err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find workout."});
      } else {
        res.json(500, { message: "Could not update workout. " + err});
      }
    });
}
