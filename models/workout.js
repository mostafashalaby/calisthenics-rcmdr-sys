/**
 * Workout class representing a complete workout plan
 */
class Workout {
  /**
   * Create a new workout
   * @param {string} id - Unique workout ID
   * @param {Object} sections - Object containing arrays of exercises per section
   * @param {number} estimatedDuration - Total workout duration in minutes
   * @param {string} focusSkill - Primary skill focus of the workout
   * @param {number} difficulty - Difficulty level (integer-based)
   */
  constructor(id, sections = {}, estimatedDuration = 30, focusSkill = null, difficulty = 1) {
    this.id = id;
    this.sections = sections;
    this.estimatedDuration = estimatedDuration;
    this.focusSkill = focusSkill;
    this.difficulty = difficulty; // now integer instead of string
    this.exercises = [];

    for (const section of ['warmup', 'skill', 'strength', 'cooldown']) {
      if (!this.sections[section]) this.sections[section] = [];
    }
  }

  /**
   * Add an exercise to a specific section
   * @param {string} section - Section name
   * @param {Exercise} exercise - Exercise to add
   */
  addExercise(section, exercise) {
    if (!this.sections[section]) {
      this.sections[section] = [];
    }
    this.sections[section].push(exercise);
    this.exercises.push(exercise);
  }

  /**
   * Replace an exercise with another
   * @param {Exercise} oldExercise - Exercise to replace
   * @param {Exercise} newExercise - Replacement exercise
   */
  replaceExercise(oldExercise, newExercise) {
    for (const section in this.sections) {
      this.sections[section] = this.sections[section].map(e =>
        e.id === oldExercise.id ? newExercise : e
      );
    }
    this.exercises = this.getAllExercises();
  }

  /**
   * Get all exercises in this workout
   * @return {Exercise[]} - Array of all exercises
   */
  getAllExercises() {
    return Object.values(this.sections).flat();
  }

  /**
   * Get total duration for a section
   * @param {string} section - Section name
   * @return {number} - Duration in minutes
   */
  getSectionDuration(section) {
    // Approximate: divide section duration proportionally
    const ratios = {
      warmup: 0.15,
      skill: 0.3,
      strength: 0.45,
      cooldown: 0.1
    };
    return Math.round(this.estimatedDuration * (ratios[section] || 0.25));
  }

  /**
   * Get average skill level of all exercises
   * @return {number}
   */
  getAverageLevel() {
    if (this.exercises.length === 0) return 1;
    const total = this.exercises.reduce((sum, ex) => sum + (ex.progressionLevel || 1), 0);
    return Math.round(total / this.exercises.length);
  }
}

module.exports = Workout;
