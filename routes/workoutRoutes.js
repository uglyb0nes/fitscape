const router = require('express').Router();
const Workout = require('../models/Workouts');

router.post('/api/workouts', async (req, res) => {
    try {
        const addWorkout = await Workout.create(req.body);
        addWorkout.save();
        res.status(200).json(addWorkout);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/api/workouts/:id', async (req, res) => {
    try {
        const adjustWorkout = await Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
            },
        },
        {
            new: true,
        }
        );
        res.status(200).json(adjustWorkout);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/api/workouts', async (req, res) => {
    try {
        const previousWorkout = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {$sum: "$exercises.duration"}
                }
            }
        ]);
        res.status(200).json(previousWorkout);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/api/workouts/range', async (req, res) => {
    try {
        const combinedWorkouts = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ]).sort({ day: -1 }).limit(7);
        res.status(200).json(combinedWorkouts);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;