const UserProfile = require('./models/user_profile');
const WorkoutRecommender = require('./recommender/workout_recommender');
const { initializeProgressionTrees } = require('./data/progression_trees');
const exerciseDatabase = require('./data/exercise_database');
const { formatWorkout } = require('./utils/workout_utils');

console.log("=== Testing Full System Integration ===");

// Step 1: Initialize the system
const user = new UserProfile('user-1', {
  skillLevels: {
    handstand: 1,
    planche: 1,
    lsit: 1
  },
  preferences: {
    workoutDuration: 30,
    excludedExercises: [],
    skillPriorities: { handstand: 1 },
    focusAreas: ['core', 'shoulders']
  }
});

const progressionTrees = initializeProgressionTrees();
const recommender = new WorkoutRecommender(exerciseDatabase, progressionTrees);

// Step 2: Generate a workout
const workout = recommender.generateWorkout(user);
console.log("\n=== Generated Workout ===");
console.log(formatWorkout(workout));

// Step 3: Simulate user feedback
const performance = {
  duration: 30,
  rating: 4,
  feedback: { difficulty: 'appropriate', enjoyment: 'high' },
  exercisePerformance: {}
};

user.recordWorkoutCompletion(workout, performance);
console.log("\n=== Feedback Added ===");
console.log(`Rating: ${performance.rating}, Enjoyment: ${performance.feedback.enjoyment}`);

// Step 4: Check if user is ready to progress
const handstandTree = progressionTrees.handstand;
const currentLevel = user.getSkillLevel('handstand');
const currentNode = Object.values(handstandTree.nodes).find(n => n.level === currentLevel);
const nextNode = currentNode?.nextNodes?.[0];

const ready = nextNode ? nextNode.hasMastered(user.performanceMetrics[nextNode.id]) : false;

console.log("\n=== Skill Readiness Estimation ===");
console.log(`Ready to progress in handstand? ${ready}`);

// Step 5: Show updated plan
console.log("\n=== Skill Development Plan (4 weeks) ===");
console.log({
  skill: 'handstand',
  currentLevel,
  plan: [] // Placeholder
});

// Step 6: Show workout history
console.log("\n=== User Workout History ===");
console.log(user.workoutHistory);

