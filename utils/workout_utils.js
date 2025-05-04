/**
 * Utility functions for workouts
 */

/**
 * Format a workout into a readable string format
 * @param {Workout} workout - Workout to format
 * @param {boolean} detailed - Whether to include detailed descriptions
 * @return {string} - Formatted workout string
 */
function formatWorkout(workout, detailed = false) {
  const difficultyLabel = typeof workout.difficulty === 'string'
  ? workout.difficulty.toUpperCase()
  : mapDifficultyLevelToString(workout.difficulty).toUpperCase();

let result = `WORKOUT PLAN: ${difficultyLabel} (${workout.estimatedDuration} minutes)\n`;

    result += `Focus: ${workout.focusSkill || 'General'}\n\n`;
    
    for (const section in workout.sections) {
      const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
      const duration = workout.getSectionDuration(section);
      result += `== ${sectionName} (${duration} minutes) ==\n`;
      
      if (workout.sections[section].length === 0) {
        result += "No exercises in this section.\n\n";
        continue;
      }
      
      workout.sections[section].forEach((exercise, index) => {
        result += `${index + 1}. ${exercise.name} (Level ${exercise.progressionLevel})`;
        
        if (detailed) {
          result += `\n   ${exercise.description}`;
          
          if (exercise.targetMuscles && exercise.targetMuscles.length > 0) {
            result += `\n   Targets: ${exercise.targetMuscles.join(', ')}`;
          }
          
          result += '\n';
        } else {
          result += '\n';
        }
      });
      
      result += '\n';
    }
    
    return result;
  }
  
  /**
   * Generate a weekly workout schedule
   * @param {Workout[]} workouts - Array of workouts
   * @param {number} daysPerWeek - Number of workout days per week
   * @return {Object} - Weekly schedule
   */
  function mapDifficultyLevelToString(level) {
    if (level <= 3) return 'beginner';
    if (level <= 6) return 'intermediate';
    return 'advanced';
  }  
  function generateWeeklySchedule(workouts, daysPerWeek = 3) {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const schedule = {};
    
    // Distribute workouts evenly
    const interval = Math.floor(7 / daysPerWeek);
    const workoutDays = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutDays.push(i * interval);
    }
    
    // Assign workouts to days
    workoutDays.forEach((dayIndex, i) => {
      const workout = workouts[i % workouts.length];
      schedule[weekdays[dayIndex]] = workout;
    });
    
    // Fill in rest days
    weekdays.forEach(day => {
      if (!schedule[day]) {
        schedule[day] = 'Rest';
      }
    });
    
    return schedule;
  }
  
  /**
   * Calculate estimated calories burned during a workout
   * @param {Workout} workout - The workout
   * @param {number} userWeight - User's weight in kg
   * @return {number} - Estimated calories burned
   */
  function estimateCaloriesBurned(workout, userWeight) {
    // MET (Metabolic Equivalent of Task) values for different activities
    const metValues = {
      warmup: 3.5,
      skill: 4.0,
      strength: 5.0,
      cooldown: 2.5
    };
    
    // Formula: calories = MET * weight (kg) * duration (hours)
    let totalCalories = 0;
    
    for (const section in workout.sections) {
      const durationHours = workout.getSectionDuration(section) / 60;
      const met = metValues[section] || 4.0;
      
      totalCalories += met * userWeight * durationHours;
    }
    
    return Math.round(totalCalories);
  }
  
  /**
   * Generate a workout log entry for a completed workout
   * @param {Workout} workout - Completed workout
   * @param {Object} performance - Performance data
   * @return {Object} - Workout log entry
   */
  function createWorkoutLogEntry(workout, performance = {}) {
    const now = new Date();
    
    const logEntry = {
      date: now.toISOString(),
      workoutId: workout.id,
      name: `${workout.difficulty} ${workout.focusSkill || 'General'} Workout`,
      duration: performance.duration || workout.estimatedDuration,
      exercises: {},
      notes: performance.notes || ''
    };
    
    // Format exercise performance data
    for (const section in workout.sections) {
      workout.sections[section].forEach(exercise => {
        const exercisePerf = performance.exercises?.[exercise.id] || {};
        
        logEntry.exercises[exercise.id] = {
          name: exercise.name,
          section,
          sets: exercisePerf.sets || [],
          completed: exercisePerf.completed || true,
          notes: exercisePerf.notes || ''
        };
      });
    }
    
    return logEntry;
  }
  
  /**
   * Check if workout is appropriate for user's current level
   * @param {Workout} workout - Workout to check
   * @param {UserProfile} userProfile - User profile
   * @return {boolean} - Whether workout is appropriate
   */
  function isWorkoutAppropriate(workout, userProfile) {
    if (!workout || !userProfile) {
      return false;
    }
    
    // Calculate average workout level
    let totalLevel = 0;
    let exerciseCount = 0;
    
    for (const section in workout.sections) {
      workout.sections[section].forEach(exercise => {
        totalLevel += exercise.progressionLevel;
        exerciseCount++;
      });
    }
    
    if (exerciseCount === 0) {
      return false;
    }
    
    const avgWorkoutLevel = totalLevel / exerciseCount;
    
    // Get user's level for the focus skill (or average if no focus)
    let userLevel;
    
    if (workout.focusSkill && userProfile.skillLevels[workout.focusSkill]) {
      userLevel = userProfile.skillLevels[workout.focusSkill];
    } else {
      // Calculate average user level across all skills
      const skillLevels = Object.values(userProfile.skillLevels);
      userLevel = skillLevels.reduce((sum, level) => sum + level, 0) / skillLevels.length;
    }
    
    // Workout is appropriate if it's within +/- 2 levels of user's level
    return Math.abs(avgWorkoutLevel - userLevel) <= 2;
  }
  
  /**
   * Adjust workout duration
   * @param {Workout} workout - Original workout
   * @param {number} newDuration - New duration in minutes
   * @return {Workout} - Adjusted workout
   */
  function adjustWorkoutDuration(workout, newDuration) {
    // Create a copy of the workout
    const adjustedWorkout = {
      ...workout,
      estimatedDuration: newDuration,
      sections: { ...workout.sections }
    };
    
    const originalDuration = workout.estimatedDuration;
    
    // If increasing duration, add exercises
    if (newDuration > originalDuration) {
      // Implementation would depend on having access to the exercise database
      // This is a placeholder for the concept
    } 
    // If decreasing duration, remove exercises
    else if (newDuration < originalDuration) {
      // Calculate how many exercises to remove from each section
      const removalFactor = 1 - (newDuration / originalDuration);
      
      for (const section in adjustedWorkout.sections) {
        const exercises = [...adjustedWorkout.sections[section]];
        const removeCount = Math.floor(exercises.length * removalFactor);
        
        if (removeCount > 0 && exercises.length > removeCount) {
          // Remove exercises from the end
          adjustedWorkout.sections[section] = exercises.slice(0, -removeCount);
        }
      }
    }
    
    // Update exercises list
    adjustedWorkout.exercises = [];
    for (const section in adjustedWorkout.sections) {
      adjustedWorkout.exercises = [
        ...adjustedWorkout.exercises,
        ...adjustedWorkout.sections[section]
      ];
    }
    
    return adjustedWorkout;
  }
  
  module.exports = {
    formatWorkout,
    generateWeeklySchedule,
    estimateCaloriesBurned,
    createWorkoutLogEntry,
    isWorkoutAppropriate,
    adjustWorkoutDuration
  };