class SimilarityCalculator {
  /**
   * Compute cosine similarity between two vectors
   */
  static cosineSimilarity(vecA, vecB) {
    const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB + 1e-6); // prevent div by zero
  }

  /**
   * Convert muscle tags into vector representation
   * @param {string[]} tags - Ordered muscle tags
   * @param {string[]} vocabulary - Full vocabulary of muscles
   * @returns {number[]} vector
   */
  static muscleTagVector(tags, vocabulary) {
    const vec = Array(vocabulary.length).fill(0);
    tags.forEach((tag, i) => {
      const index = vocabulary.indexOf(tag);
      if (index !== -1) {
        // Weight based on importance (first tag more important)
        vec[index] = 1.0 - i * 0.1;
      }
    });
    return vec;
  }

  /**
   * Create a combined feature vector from an exercise
   * @param {Exercise} exercise
   * @param {string[]} vocabulary
   * @returns {number[]}
   */
  static getExerciseVector(exercise, vocabulary) {
    const muscleVec = this.muscleTagVector(exercise.targetMuscles || [], vocabulary);
    return [...muscleVec, exercise.progressionLevel || 1]; // global level as final feature
  }

  /**
   * Find the most similar exercise
   * @param {Exercise} target
   * @param {Exercise[]} candidates
   * @param {Object} skillLevels - user's skill level per skill
   * @param {string[]} excludedIds
   * @returns {Exercise|null}
   */
  findSimilarExercise(target, candidates, skillLevels, excludedIds = []) {
    if (!target || !target.targetMuscles || !target.progressionLevel) return null;

    const vocabulary = this.buildVocabulary([...candidates, target]);
    const targetVec = SimilarityCalculator.getExerciseVector(target, vocabulary);

    let bestMatch = null;
    let bestScore = -Infinity;

    for (const exercise of candidates) {
      if (exercise.id === target.id || excludedIds.includes(exercise.id)) continue;
      const exVec = SimilarityCalculator.getExerciseVector(exercise, vocabulary);
      const score = SimilarityCalculator.cosineSimilarity(targetVec, exVec);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = exercise;
      }
    }

    return bestMatch;
  }

  /**
   * Build a muscle vocabulary from all exercises
   * @param {Exercise[]} exercises
   * @returns {string[]} unique muscle tags
   */
  buildVocabulary(exercises) {
    const tagSet = new Set();
    exercises.forEach(ex => {
      (ex.targetMuscles || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }
}

module.exports = SimilarityCalculator;
