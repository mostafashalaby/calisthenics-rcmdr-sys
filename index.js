const WorkoutRecommender = require('./core/workout_recommender');
const UserProfile = require('./models/user_profile');
const { initializeProgressionTrees } = require('./data/progression_tree');
const { EXERCISE_DATABASE } = require('./data/exercise_database');
const { formatWorkout } = require('./utils/workout_utils');

// Optional: Start system demo
function runDemo() {
  const user = new UserProfile('user123', {
    handstand: 1,
    planche: 1,
    lsit: 1,
    frontLever: 1,
    backLever: 1
  });

  user.setPreferences({
    workoutDuration: 30,
    workoutFrequency: 3,
    focusAreas: ['core', 'shoulders'],
    excludedExercises: [],
    skillPriorities: {
      handstand: 5,
      planche: 3
    }
  });

  const trees = initializeProgressionTrees();
  const recommender = new WorkoutRecommender(EXERCISE_DATABASE, trees);

  const workout = recommender.generateWorkout(user);

  console.log("\n=== Generated Workout Plan ===");
  console.log(formatWorkout(workout, true));
}

// Run demo if this file is run directly
if (require.main === module) {
  runDemo();
}

module.exports = {
  WorkoutRecommender,
  UserProfile,
  initializeProgressionTrees,
  EXERCISE_DATABASE
};
