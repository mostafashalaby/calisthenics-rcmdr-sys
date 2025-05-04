# Calisthenics Workout Recommender System

A modular, personalized workout recommender system for calisthenics enthusiasts. This system helps users progress through skill-based calisthenics movements like handstands, planches, and L-sits by generating customized workouts based on their current level and preferences.

## System Architecture

The system follows a modular architecture with clearly separated components:

### Core Components

- **Models**: Data structures for exercises, skill progressions, user profiles, and workouts
- **Data**: Sample exercise database and progression trees
- **Recommender**: Intelligent algorithms for workout generation and recommendation
- **Utils**: Helper functions and utilities

## Directory Structure

```
/
├── models/
│   ├── exercise.js           # Exercise class definition
│   ├── progression_node.js   # ProgressionNode class for skill trees
│   ├── user_profile.js       # UserProfile class for user data
│   └── workout.js            # Workout class structure
│
├── data/
│   ├── exercise_database.js  # Sample exercise initialization
│   └── progression_trees.js  # Skill progression trees
│
├── recommender/
│   ├── workout_recommender.js    # Main recommender logic
│   ├── exercise_selector.js      # Exercise selection algorithms
│   ├── similarity_calculator.js  # Finding similar exercises
│   └── progression_tracker.js    # Tracking user progression
│
├── utils/
│   ├── workout_utils.js      # Workout utility functions
│   └── exercise_shuffler.js  # Replacing exercises
│
└── index.js                  # Main entry point
```

## Features

### Core Functionality

- **Personalized Workout Generation**: Creates tailored workouts based on user level and preferences
- **Skill Progression Tracking**: Tracks progress through skill progressions like handstand, planche, etc.
- **Exercise Selection**: Intelligently selects exercises appropriate for the user's current level
- **Workout Adaptation**: Modifies workouts based on user feedback and preferences

### Advanced Features

- **Exercise Similarity**: Finds similar exercises for variety and alternatives
- **Progression Planning**: Generates long-term skill development plans
- **Workout Shuffling**: Refreshes workouts with new exercises while maintaining structure
- **Performance Tracking**: Records and analyzes workout performance

## Usage

### Basic Example

```javascript
// Initialize the system
const system = initializeSystem();

// Create a user profile
const userProfile = createSampleUserProfile("user1", "John Doe");

// Generate a workout
const workout = system.recommender.generateWorkout(userProfile, {
  duration: 30,
  focusSkill: 'handstand'
});

// Format the workout plan
const workoutPlan = system.utils.formatWorkout(workout, true);
console.log(workoutPlan);
```

### Custom Workout Generation

```javascript
// Generate a workout with specific options
const customWorkout = system.recommender.generateWorkout(userProfile, {
  duration: 45,           // 45-minute workout
  focusSkill: 'planche',  // Focus on planche progression
  difficulty: 'advanced'  // Override difficulty
});
```

### Workout Modification

```javascript
// Replace exercises in a workout
const shuffleResult = system.utils.exerciseShuffler.shuffleCategoryExercises(
  workout,
  'strength',
  userProfile
);

// Adjust workout duration
const shorterWorkout = system.utils.adjustWorkoutDuration(workout, 20);
```

### Progression Planning

```javascript
// Generate a skill development plan
const progressionPlan = system.recommender.progressionTracker.generateSkillDevelopmentPlan(
  userProfile,
  'handstand',
  4  // 4 weeks
);
```

## Extending the System

### Adding New Exercises

1. Add the exercise to `data/exercise_database.js`:

```javascript
exercises['new-exercise-id'] = new Exercise(
  'new-exercise-id',
  'New Exercise Name',
  'category',
  progressionLevel,
  ['target', 'muscles'],
  ['prerequisites'],
  'Description of the exercise',
  { isStatic: false, isDynamic: true }
);
```

### Creating New Progression Trees

1. Add a new function in `data/progression_trees.js`:

```javascript
function buildNewSkillTree() {
  // Create progression nodes
  const firstNode = new ProgressionNode(
    'skill-first-step',
    'First Step Name',
    1,
    'skillName',
    ['exercise-ids'],
    [],
    { holdTime: 30 }
  );
  
  // Connect nodes and return tree
  return {
    nodes: { 'skill-first-step': firstNode },
    root: firstNode,
    skill: 'skillName'
  };
}
```

2. Add the new tree to the `initializeProgressionTrees` function.

## License

MIT