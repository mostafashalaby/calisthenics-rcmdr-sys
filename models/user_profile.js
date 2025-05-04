/**
 * UserProfile class representing a user's preferences, progress, and personal information
 */
class UserProfile {
  /**
   * Create a new user profile
   * @param {Object} data - User profile data
   */
  constructor(data = {}) {
    // Unique identifier
    this.id = data.id || `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Basic user information
    this.name = data.name || '';
    this.email = data.email || '';
    this.dateCreated = data.dateCreated || new Date();
    this.lastActive = data.lastActive || new Date();
    
    // Physical attributes for better workout customization
    this.age = data.age || null;
    this.gender = data.gender || null;
    this.height = data.height || null; // in cm
    this.weight = data.weight || null; // in kg
    
    // Workout preferences
    this.preferences = {
      workoutDuration: data.preferences?.workoutDuration || 30, // Minutes
      focusAreas: data.preferences?.focusAreas || [], // Muscle groups or skills to focus on
      excludedExercises: data.preferences?.excludedExercises || [], // Exercises to avoid
      workoutFrequency: data.preferences?.workoutFrequency || 3, // Times per week
      skillPriorities: data.preferences?.skillPriorities || {}, // Priority level for each skill (1-10)
      workoutReminders: data.preferences?.workoutReminders || true, // Enable workout reminders
      equipment: data.preferences?.equipment || [], // Available equipment
      preferredWorkoutTime: data.preferences?.preferredWorkoutTime || null, // Time of day preference
      difficulty: data.preferences?.difficulty || 'auto' // Manual override for difficulty
    };
    
    // Skill levels for various calisthenics skills
    this.skillLevels = {
      handstand: data.skillLevels?.handstand || 1,
      planche: data.skillLevels?.planche || 1,
      lsit: data.skillLevels?.lsit || 1,
      frontLever: data.skillLevels?.frontLever || 1,
      backLever: data.skillLevels?.backLever || 1,
      ...data.skillLevels
    };
    
    // Completed progression nodes by skill
    this.completedNodes = data.completedNodes || {};
    
    // Workout history
    this.workoutHistory = data.workoutHistory || [];
    
    // Performance metrics for each progression node
    this.performanceMetrics = data.performanceMetrics || {};
    
    // User's goals
    this.goals = data.goals || {
      primarySkill: null,
      targetDate: null,
      weeklyWorkouts: null,
      notes: ''
    };
    
    // Health and limitations
    this.healthInfo = data.healthInfo || {
      injuries: [],
      limitations: [],
      medicalConditions: []
    };
    
    // App-specific settings
    this.appSettings = data.appSettings || {
      notifications: true,
      darkMode: false,
      language: 'en',
      units: 'metric', // 'metric' or 'imperial'
      privacyPreferences: {
        shareWorkoutData: false,
        allowAnonymousStats: true
      }
    };
    
    // Onboarding completion tracking
    this.onboarding = data.onboarding || {
      completed: false,
      step: 1,
      assessmentCompleted: false,
      tutorialSeen: false
    };
  }
  /**
 * Get the skill level for a specific skill
 * @param {string} skill - The skill name (e.g., 'handstand')
 * @return {number} - The user's level for that skill
 */
  getSkillLevel(skill) {
    return this.skillLevels[skill] || 1;
  }

  /**
   * Update user's preferences
   * @param {Object} newPreferences - Updated preferences
   */
  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    this.lastActive = new Date();
  }

  /**
   * Update skill level for a specific skill
   * @param {string} skill - The skill to update
   * @param {number} level - New level for the skill
   */
  updateSkillLevel(skill, level) {
    this.skillLevels[skill] = level;
    this.lastActive = new Date();
  }

  /**
   * Mark a progression node as completed
   * @param {string} skill - The skill type
   * @param {string} nodeId - ID of the completed node
   */
  completeProgressionNode(skill, nodeId) {
    if (!this.completedNodes[skill]) {
      this.completedNodes[skill] = [];
    }
    
    if (!this.completedNodes[skill].includes(nodeId)) {
      this.completedNodes[skill].push(nodeId);
    }
    
    this.lastActive = new Date();
  }

  /**
   * Record workout completion
   * @param {Workout} workout - The completed workout
   * @param {Object} performance - Performance data for the workout
   */
  recordWorkoutCompletion(workout, performance = {}) {
    const completionRecord = {
      workoutId: workout.id,
      date: new Date(),
      duration: performance.duration || workout.estimatedDuration,
      exercises: workout.exercises.map(ex => ({
        id: ex.id,
        name: ex.name,
        category: ex.category,
        completed: performance.exercises?.[ex.id]?.completed || true,
        notes: performance.exercises?.[ex.id]?.notes || '',
        sets: performance.exercises?.[ex.id]?.sets || []
      })),
      feedback: performance.feedback || {},
      rating: performance.rating,
      notes: performance.notes || '',
      caloriesBurned: performance.caloriesBurned || this.estimateCaloriesBurned(workout)
    };
    
    this.workoutHistory.push(completionRecord);
    this.lastActive = new Date();
    
    // Update performance metrics for skill nodes if applicable
    if (performance.exercisePerformance) {
      for (const nodeId in performance.exercisePerformance) {
        this.updateNodePerformance(nodeId, performance.exercisePerformance[nodeId]);
      }
    }
  }

  /**
   * Update performance metrics for a progression node
   * @param {string} nodeId - ID of the progression node
   * @param {Object} metrics - Performance metrics (e.g., time, reps)
   */
  updateNodePerformance(nodeId, metrics) {
    if (!this.performanceMetrics[nodeId]) {
      this.performanceMetrics[nodeId] = {
        attempts: 0,
        successfulAttempts: 0,
        maxTime: 0,
        maxReps: 0,
        consecutiveSuccesses: 0,
        lastAttemptDate: null
      };
    }
    
    const performance = this.performanceMetrics[nodeId];
    performance.attempts += 1;
    performance.lastAttemptDate = new Date();
    
    if (metrics.success) {
      performance.successfulAttempts += 1;
      performance.consecutiveSuccesses += 1;
    } else {
      performance.consecutiveSuccesses = 0;
    }
    
    if (metrics.time && metrics.time > performance.maxTime) {
      performance.maxTime = metrics.time;
    }
    
    if (metrics.reps && metrics.reps > performance.maxReps) {
      performance.maxReps = metrics.reps;
    }
    
    this.lastActive = new Date();
  }

  /**
   * Get user's accessible progression nodes for a skill
   * @param {string} skill - The skill type
   * @param {ProgressionNode[]} allNodes - All progression nodes for the skill
   * @return {ProgressionNode[]} - Accessible nodes
   */
  getAccessibleNodes(skill, allNodes) {
    const completed = this.completedNodes[skill] || [];
    return allNodes.filter(node => node.isAccessible(completed));
  }

  /**
   * Check if user has mastered a specific progression node
   * @param {string} nodeId - ID of the node to check
   * @return {boolean} - Whether node is mastered
   */
  hasNodeMastered(nodeId) {
    return this.performanceMetrics[nodeId] && 
           this.performanceMetrics[nodeId].consecutiveSuccesses >= 3;
  }
  
  /**
   * Update user's goals
   * @param {Object} newGoals - Updated goals
   */
  updateGoals(newGoals) {
    this.goals = { ...this.goals, ...newGoals };
    this.lastActive = new Date();
  }
  
  /**
   * Update user's health information
   * @param {Object} healthInfo - Updated health information
   */
  updateHealthInfo(healthInfo) {
    this.healthInfo = { ...this.healthInfo, ...healthInfo };
    this.lastActive = new Date();
  }
  
  /**
   * Update app settings
   * @param {Object} newSettings - New app settings
   */
  updateAppSettings(newSettings) {
    this.appSettings = { ...this.appSettings, ...newSettings };
    this.lastActive = new Date();
  }
  
  /**
   * Update onboarding progress
   * @param {Object} onboardingInfo - Updated onboarding information
   */
  updateOnboarding(onboardingInfo) {
    this.onboarding = { ...this.onboarding, ...onboardingInfo };
    this.lastActive = new Date();
  }
  
  /**
   * Update user's basic information
   * @param {Object} info - Updated user information
   */
  updateUserInfo(info) {
    if (info.name) this.name = info.name;
    if (info.email) this.email = info.email;
    if (info.age !== undefined) this.age = info.age;
    if (info.gender !== undefined) this.gender = info.gender;
    if (info.height !== undefined) this.height = info.height;
    if (info.weight !== undefined) this.weight = info.weight;
    
    this.lastActive = new Date();
  }
  
  /**
   * Estimate calories burned for a workout based on user's physical attributes
   * @param {Workout} workout - The workout to estimate for
   * @return {number} - Estimated calories burned
   */
  estimateCaloriesBurned(workout) {
    if (!this.weight) return null;
    
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
      
      totalCalories += met * this.weight * durationHours;
    }
    
    return Math.round(totalCalories);
  }
  
  /**
   * Get user's overall fitness level (1-10)
   * @return {number} - Overall fitness level
   */
  getOverallFitnessLevel() {
    const skills = Object.values(this.skillLevels);
    if (skills.length === 0) return 1;
    
    const avgLevel = skills.reduce((sum, level) => sum + level, 0) / skills.length;
    return Math.round(avgLevel);
  }
  
  /**
   * Get user's streak (consecutive days with completed workouts)
   * @return {number} - Current streak
   */
  getCurrentStreak() {
    if (this.workoutHistory.length === 0) return 0;
    
    // Sort workouts by date (newest first)
    const sortedWorkouts = [...this.workoutHistory].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    // Check if there's a workout today
    const lastWorkoutDate = new Date(sortedWorkouts[0].date);
    lastWorkoutDate.setHours(0, 0, 0, 0);
    
    if (lastWorkoutDate.getTime() !== today.getTime()) {
      // No workout today, check if there was one yesterday
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastWorkoutDate.getTime() !== yesterday.getTime()) {
        // No workout yesterday either, streak is 0
        return 0;
      }
      
      // Start checking from yesterday
      currentDate = yesterday;
    }
    
    // Count consecutive days with workouts
    let checkDate = new Date(currentDate);
    let foundWorkout = false;
    
    do {
      foundWorkout = false;
      
      for (const workout of sortedWorkouts) {
        const workoutDate = new Date(workout.date);
        workoutDate.setHours(0, 0, 0, 0);
        
        if (workoutDate.getTime() === checkDate.getTime()) {
          foundWorkout = true;
          streak++;
          break;
        }
      }
      
      if (!foundWorkout) break;
      
      // Move to previous day
      checkDate.setDate(checkDate.getDate() - 1);
    } while (foundWorkout);
    
    return streak;
  }
  
  /**
   * Export user data in a format suitable for storage
   * @return {Object} - User data for storage
   */
  exportData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      dateCreated: this.dateCreated,
      lastActive: this.lastActive,
      age: this.age,
      gender: this.gender,
      height: this.height,
      weight: this.weight,
      preferences: this.preferences,
      skillLevels: this.skillLevels,
      completedNodes: this.completedNodes,
      workoutHistory: this.workoutHistory,
      performanceMetrics: this.performanceMetrics,
      goals: this.goals,
      healthInfo: this.healthInfo,
      appSettings: this.appSettings,
      onboarding: this.onboarding
    };
  }
  
  /**
   * Create a user profile from stored data
   * @param {Object} data - Stored user data
   * @return {UserProfile} - Restored user profile
   */
  static fromStoredData(data) {
    return new UserProfile(data);
  }
}

module.exports = UserProfile;