// utils/exercise_shuffler.js
const { vectorizeExercise, cosineSimilarity } = require('./embedding_utils');

/**
 * Shuffle exercises in a workout category.
 * Replaces exercises that are disliked or request replacement
 */
function shuffleCategoryExercises(workout, category, userProfile, exerciseDB) {
  if (!workout[category]) return false;

  let replacedCount = 0;
  const disliked = new Set(userProfile.dislikedExercises || []);

  workout[category] = workout[category].map((exercise) => {
    // Skip if not disliked
    if (!disliked.has(exercise.id)) return exercise;

    const alternatives = suggestSimilar(exercise, exerciseDB);
    if (alternatives.length > 0) {
      replacedCount++;
      return alternatives[0]; // pick most similar
    } else {
      return exercise; // fallback to original
    }
  });

  return {
    modifiedWorkout: workout,
    replacedCount
  };
}

/**
 * Suggest similar exercises based on cosine similarity
 */
function suggestSimilar(exercise, allExercises) {
  const candidates = Object.values(allExercises).filter(e =>
    e.category === exercise.category &&
    e.id !== exercise.id &&
    e.progressionLevel <= exercise.progressionLevel
  );

  const targetVec = vectorizeExercise(exercise);
  const scored = candidates.map(e => ({
    exercise: e,
    score: cosineSimilarity(targetVec, vectorizeExercise(e))
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.exercise).slice(0, 3);
}

module.exports = {
  shuffleCategoryExercises,
  suggestSimilar
};
