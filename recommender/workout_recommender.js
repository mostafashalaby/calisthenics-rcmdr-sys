const Workout = require('../models/workout');
const ExerciseSelector = require('./exercise_selector');
const SimilarityCalculator = require('./similarity_calculator');
const ProgressionTracker = require('./progression_tracker');

/**
 * WorkoutRecommender class for generating personalized workouts
 */
class WorkoutRecommender {
  constructor(exerciseDatabase, progressionTrees) {
    this.exerciseDatabase = exerciseDatabase;
    this.progressionTrees = progressionTrees;
    this.exerciseSelector = new ExerciseSelector(exerciseDatabase);
    this.similarityCalculator = new SimilarityCalculator();
    this.progressionTracker = new ProgressionTracker(progressionTrees);
  }

  /**
   * Generate a personalized workout
   */
  generateWorkout(userProfile, options = {}) {
    const workoutDuration = options.duration || userProfile.preferences.workoutDuration || 30;
    const focusSkill = options.focusSkill || this.getHighestPrioritySkill(userProfile);
    const difficulty = this.estimateGlobalSkillLevel(userProfile);

    const workout = new Workout(
      `workout-${Date.now()}`,
      {},
      workoutDuration,
      focusSkill,
      difficulty
    );

    const sectionDurations = this.calculateSectionDurations(workoutDuration);

    const warmups = this.exerciseSelector.selectWarmupExercises(userProfile, sectionDurations.warmup);
    warmups.forEach(ex => workout.addExercise('warmup', ex));

    const skills = this.exerciseSelector.selectSkillExercises(userProfile, sectionDurations.skill, focusSkill);
    skills.forEach(ex => workout.addExercise('skill', ex));

    const strengths = this.exerciseSelector.selectStrengthExercises(userProfile, sectionDurations.strength, focusSkill);
    strengths.forEach(ex => workout.addExercise('strength', ex));

    const cooldowns = this.exerciseSelector.selectCooldownExercises(userProfile, sectionDurations.cooldown);
    cooldowns.forEach(ex => workout.addExercise('cooldown', ex));

    return workout;
  }

  calculateSectionDurations(totalDuration) {
    const sectionRatios = {
      warmup: 0.15,
      skill: 0.30,
      strength: 0.45,
      cooldown: 0.10
    };

    return {
      warmup: Math.round(totalDuration * sectionRatios.warmup),
      skill: Math.round(totalDuration * sectionRatios.skill),
      strength: Math.round(totalDuration * sectionRatios.strength),
      cooldown: Math.round(totalDuration * sectionRatios.cooldown)
    };
  }

  /**
   * Estimate global skill level as average of all skill levels
   */
  estimateGlobalSkillLevel(userProfile) {
    const levels = Object.values(userProfile.skillLevels || {});
    if (levels.length === 0) return 1;
    return Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
  }

  getHighestPrioritySkill(userProfile) {
    const prefs = userProfile.preferences.skillPriorities || {};
    if (Object.keys(prefs).length === 0) {
      return Object.entries(userProfile.skillLevels)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'handstand';
    }

    return Object.entries(prefs)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'handstand';
  }

  /**
   * Generate a multi-day workout plan
   */
  generateWorkoutPlan(userProfile, days = 7, options = {}) {
    const workouts = [];
    const freq = userProfile.preferences.workoutFrequency || 3;
    const workoutDays = this.distributeWorkoutDays(days, freq);

    for (let i = 0; i < days; i++) {
      if (workoutDays.includes(i)) {
        const skillIndex = Math.floor(workouts.length / 2) % Object.keys(this.progressionTrees).length;
        const focusSkill = Object.keys(this.progressionTrees)[skillIndex];
        const workout = this.generateWorkout(userProfile, { ...options, focusSkill });
        workouts.push({ day: i, workout });
      } else {
        workouts.push({ day: i, workout: null, isRest: true });
      }
    }

    return workouts;
  }

  distributeWorkoutDays(totalDays, frequency) {
    const daysPerWeek = 7;
    frequency = Math.max(1, Math.min(frequency, 6));
    const interval = Math.floor(daysPerWeek / frequency);
    const workoutDays = [];

    for (let week = 0; week < Math.ceil(totalDays / daysPerWeek); week++) {
      for (let i = 0; i < frequency; i++) {
        const day = week * daysPerWeek + i * interval;
        if (day < totalDays) workoutDays.push(day);
      }
    }

    return workoutDays;
  }

  trackProgress(userProfile, workout, performance) {
    userProfile.recordWorkoutCompletion(workout, performance);

    if (workout.focusSkill && performance.exercisePerformance) {
      const skillTree = this.progressionTrees[workout.focusSkill];
      if (skillTree) {
        for (const nodeId in performance.exercisePerformance) {
          const node = skillTree.nodes[nodeId];
          if (node) {
            userProfile.updateNodePerformance(nodeId, performance.exercisePerformance[nodeId]);
            if (userProfile.hasNodeMastered(nodeId)) {
              userProfile.completeProgressionNode(workout.focusSkill, nodeId);
              this.progressionTracker.updateSkillLevel(userProfile, workout.focusSkill);
            }
          }
        }
      }
    }

    return userProfile;
  }
}

module.exports = WorkoutRecommender;
