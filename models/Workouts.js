const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: [true, 'Resistance or Cardio'],
                },
                name: {
                    type: String,
                    minLength: 2,
                    required: [true, 'must be at least 2 characters'],
                },
                duration: {
                    type: Number,
                },
                weight: {
                    type: Number,
                },
                sets: {
                    type: Number,
                    min: 1,
                },
                reps: {
                    type: Number,
                    min: 1,
                },
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        }
    });

const Workout = mongoose.model('Workouts', workoutSchema);
module.exports = Workout;