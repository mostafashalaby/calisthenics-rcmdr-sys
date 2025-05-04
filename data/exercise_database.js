/**
 * A simple in-memory exercise database.
 * Each exercise has a unique ID and contains metadata including muscle tags,
 * progression level, and performance goals (reps/duration).
 */

const exerciseDatabase = {
  'wu-plank': {
    id: 'wu-plank',
    name: 'Plank Warmup',
    category: 'warmup',
    targetMuscles: ['core', 'shoulders'],
    skillTags: ['core stability'],
    progressionLevel: 1,
    repRange: [10, 20],
    timeRange: [30, 60],
    description: 'Hold a plank position for a designated duration.'
  },
  'st-pushup': {
    id: 'st-pushup',
    name: 'Standard Pushup',
    category: 'strength',
    targetMuscles: ['chest', 'triceps', 'core'],
    skillTags: ['push'],
    progressionLevel: 2,
    repRange: [8, 15],
    timeRange: [0, 0],
    description: 'Perform push-ups maintaining a straight body line.'
  },
  'hs-wall-plank': {
    id: 'hs-wall-plank',
    name: 'Wall Plank',
    category: 'skill',
    targetMuscles: ['shoulders', 'core'],
    skillTags: ['handstand'],
    progressionLevel: 1,
    repRange: [0, 0],
    timeRange: [30, 60],
    description: 'Hold a plank position with your feet against the wall.'
  },
  'hs-pike-pushup': {
    id: 'hs-pike-pushup',
    name: 'Pike Pushup',
    category: 'skill',
    targetMuscles: ['shoulders', 'triceps'],
    skillTags: ['handstand'],
    progressionLevel: 2,
    repRange: [6, 12],
    timeRange: [0, 0],
    description: 'Perform pushups in a pike position to build shoulder strength.'
  },
  'hs-wall-walk': {
    id: 'hs-wall-walk',
    name: 'Wall Walk',
    category: 'skill',
    targetMuscles: ['shoulders', 'core'],
    skillTags: ['handstand'],
    progressionLevel: 2,
    repRange: [3, 6],
    timeRange: [0, 0],
    description: 'Walk feet up the wall and back down in control.'
  },
  'hs-wall-handstand': {
    id: 'hs-wall-handstand',
    name: 'Wall Handstand',
    category: 'skill',
    targetMuscles: ['shoulders', 'core'],
    skillTags: ['handstand'],
    progressionLevel: 3,
    repRange: [0, 0],
    timeRange: [30, 60],
    description: 'Hold a handstand with your chest facing the wall.'
  }
  // Add more exercises here as needed
};

module.exports = exerciseDatabase;
