// models/exercise.js

class Exercise {
  /**
   * Create a new Exercise object
   * @param {string} id - Unique exercise identifier
   * @param {string} name - Display name of the exercise
   * @param {string} category - warmup, skill, strength, cooldown
   * @param {number} progressionLevel - Global difficulty level (e.g., 1 to 10)
   * @param {string[]} targetMuscles - Ordered list: most used to least
   * @param {string[]} prerequisites - Prerequisite exercise IDs (if any)
   * @param {string} description - Short exercise description
   * @param {Object} flags - Additional flags for filtering or tags
   */
  constructor(
    id,
    name,
    category,
    progressionLevel,
    targetMuscles,
    prerequisites = [],
    description = '',
    flags = {}
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.progressionLevel = progressionLevel; // Used globally, not tree-specific
    this.targetMuscles = targetMuscles;
    this.prerequisites = prerequisites;
    this.description = description;
    this.flags = flags;

    // Additional tags for ML
    this.exercise_skill_level = progressionLevel;
    this.exercise_muscle_tags = targetMuscles;
  }

  /**
   * Determine if exercise is suitable for a specific user level
   * @param {number} userLevel
   * @returns {boolean}
   */
  isSuitableForLevel(userLevel) {
    return Math.abs(this.progressionLevel - userLevel) <= 2;
  }
}

module.exports = Exercise;
