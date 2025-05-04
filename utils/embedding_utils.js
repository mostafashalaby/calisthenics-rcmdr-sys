// utils/embedding_utils.js

/**
 * Converts an exercise to a vector: [level, tag1, tag2, ...]
 * Tag vocabulary should match across all exercises
 */
const TAGS = [
    'core', 'arms', 'shoulders', 'legs', 'back', 'mobility', 'balance',
    'chest', 'triceps', 'biceps', 'glutes', 'hamstrings', 'quadriceps', 'calves', 'wrists'
  ];
  
  function vectorizeExercise(exercise) {
    const tagVec = TAGS.map(tag => exercise.tags.includes(tag) ? 1 : 0);
    return [exercise.progressionLevel, ...tagVec];
  }
  
  function cosineSimilarity(vecA, vecB) {
    const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    if (magA === 0 || magB === 0) return 0;
    return dot / (magA * magB);
  }
  
  module.exports = {
    vectorizeExercise,
    cosineSimilarity,
    TAGS
  };
  