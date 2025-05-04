/**
 * Data models for user assessment forms
 * These define the structure of data collected during the onboarding process
 */

/**
 * Basic user information form
 */
const BasicInfoForm = {
    name: {
      type: 'string',
      required: true,
      label: 'Full Name',
      placeholder: 'Enter your name'
    },
    email: {
      type: 'email',
      required: true,
      label: 'Email Address',
      placeholder: 'your@email.com'
    },
    password: {
      type: 'password',
      required: true,
      label: 'Password',
      placeholder: 'Create a password',
      minLength: 8
    },
    confirmPassword: {
      type: 'password',
      required: true,
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      validation: 'match:password'
    },
    termsAccepted: {
      type: 'boolean',
      required: true,
      label: 'I accept the Terms of Service and Privacy Policy'
    }
  };
  
  /**
   * Fitness level assessment form
   */
  const FitnessLevelForm = {
    age: {
      type: 'number',
      required: true,
      label: 'Age',
      min: 13,
      max: 100
    },
    gender: {
      type: 'select',
      required: false,
      label: 'Gender',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
      ]
    },
    height: {
      type: 'number',
      required: false,
      label: 'Height (cm)',
      min: 100,
      max: 250
    },
    weight: {
      type: 'number',
      required: false,
      label: 'Weight (kg)',
      min: 30,
      max: 250
    },
    experienceLevel: {
      type: 'select',
      required: true,
      label: 'Fitness Experience Level',
      options: [
        { value: 'beginner', label: 'Beginner - New to regular exercise' },
        { value: 'intermediate', label: 'Intermediate - Exercising regularly for 6+ months' },
        { value: 'advanced', label: 'Advanced - Consistent training for 2+ years' }
      ]
    },
    previousTraining: {
      type: 'multiselect',
      required: false,
      label: 'Previous Training Experience',
      options: [
        { value: 'calisthenics', label: 'Calisthenics/Bodyweight Training' },
        { value: 'weightlifting', label: 'Weightlifting/Resistance Training' },
        { value: 'gymnastics', label: 'Gymnastics' },
        { value: 'yoga', label: 'Yoga' },
        { value: 'pilates', label: 'Pilates' },
        { value: 'crossfit', label: 'CrossFit' },
        { value: 'martial-arts', label: 'Martial Arts' },
        { value: 'running', label: 'Running/Cardio' },
        { value: 'team-sports', label: 'Team Sports' },
        { value: 'none', label: 'No Previous Experience' }
      ]
    },
    trainingFrequency: {
      type: 'select',
      required: true,
      label: 'Current Training Frequency',
      options: [
        { value: 'none', label: 'None' },
        { value: '1-2', label: '1-2 times per week' },
        { value: '3-4', label: '3-4 times per week' },
        { value: '5+', label: '5+ times per week' }
      ]
    },
    fitnessGoals: {
      type: 'multiselect',
      required: true,
      label: 'Fitness Goals',
      options: [
        { value: 'skill-mastery', label: 'Master specific skills (handstand, planche, etc.)' },
        { value: 'strength', label: 'Build strength' },
        { value: 'muscle', label: 'Build muscle' },
        { value: 'fat-loss', label: 'Lose fat' },
        { value: 'endurance', label: 'Improve endurance' },
        { value: 'mobility', label: 'Improve mobility/flexibility' },
        { value: 'health', label: 'General health and wellness' },
        { value: 'performance', label: 'Athletic performance' }
      ]
    }
  };
  
  /**
   * Handstand abilities assessment form
   */
  const HandstandAbilitiesForm = {
    wallPlank: {
      type: 'boolean',
      label: 'Wall Plank (30+ seconds)',
      description: 'Can hold a plank position with feet against wall'
    },
    pikePushup: {
      type: 'boolean',
      label: 'Pike Push-up (8+ reps)',
      description: 'Can perform pike push-ups with hips elevated'
    },
    wallWalk: {
      type: 'boolean',
      label: 'Wall Walk (3+ reps)',
      description: 'Can walk feet up wall and back down with control'
    },
    wallHandstand: {
      type: 'boolean',
      label: 'Wall Handstand (30+ seconds)',
      description: 'Can hold a handstand against the wall'
    },
    chestToWall: {
      type: 'boolean',
      label: 'Chest-to-Wall Handstand (30+ seconds)',
      description: 'Can hold a handstand with chest facing the wall'
    },
    toePulls: {
      type: 'boolean',
      label: 'Toe Pulls (5+ reps)',
      description: 'Can remove one toe from wall and balance momentarily'
    },
    heelPulls: {
      type: 'boolean',
      label: 'Heel Pulls (5+ reps)',
      description: 'Can pull heels away from wall and balance momentarily'
    },
    freestanding: {
      type: 'boolean',
      label: 'Freestanding Handstand (5+ seconds)',
      description: 'Can hold a handstand without wall support'
    },
    handstandWalk: {
      type: 'boolean',
      label: 'Handstand Walk (a few steps)',
      description: 'Can take steps while in a handstand'
    },
    handstandPushup: {
      type: 'boolean',
      label: 'Handstand Push-up (1+ rep)',
      description: 'Can perform a push-up in handstand position'
    }
  };
  
  /**
   * Planche abilities assessment form
   */
  const PlancheAbilitiesForm = {
    plank: {
      type: 'boolean',
      label: 'Plank (60+ seconds)',
      description: 'Can hold a standard plank position'
    },
    elevatedPlank: {
      type: 'boolean',
      label: 'Elevated Plank (30+ seconds)',
      description: 'Can hold a plank with feet elevated'
    },
    pseudoPlanche: {
      type: 'boolean',
      label: 'Pseudo Planche (15+ seconds)',
      description: 'Can hold a plank with shoulders forward of wrists'
    },
    plancheLeans: {
      type: 'boolean',
      label: 'Planche Leans (15+ seconds)',
      description: 'Can perform planche leans with significant forward lean'
    },
    tuckPlanche: {
      type: 'boolean',
      label: 'Tuck Planche (5+ seconds)',
      description: 'Can hold a tuck planche without support'
    },
    advTuckPlanche: {
      type: 'boolean',
      label: 'Advanced Tuck Planche (5+ seconds)',
      description: 'Can hold an advanced tuck planche with flatter back'
    },
    straddlePlanche: {
      type: 'boolean',
      label: 'Straddle Planche (any duration)',
      description: 'Can hold a straddle planche momentarily'
    },
    fullPlanche: {
      type: 'boolean',
      label: 'Full Planche (any duration)',
      description: 'Can hold a full planche momentarily'
    }
  };
  
  /**
   * L-sit abilities assessment form
   */
  const LSitAbilitiesForm = {
    footSupported: {
      type: 'boolean',
      label: 'Foot Supported L-Sit (30+ seconds)',
      description: 'Can hold an L-sit with feet on ground'
    },
    oneFootSupported: {
      type: 'boolean',
      label: 'One-Foot Supported L-Sit (30+ seconds)',
      description: 'Can hold an L-sit with one foot raised'
    },
    tuckLSit: {
      type: 'boolean',
      label: 'Tuck L-Sit (10+ seconds)',
      description: 'Can hold a tuck L-sit with both feet off ground'
    },
    oneLegLSit: {
      type: 'boolean',
      label: 'One-Leg L-Sit (10+ seconds)',
      description: 'Can hold an L-sit with one leg extended'
    },
    fullLSit: {
      type: 'boolean',
      label: 'Full L-Sit (10+ seconds)',
      description: 'Can hold a full L-sit with both legs extended'
    },
    vSit: {
      type: 'boolean',
      label: 'V-Sit (any duration)',
      description: 'Can hold a V-sit momentarily'
    },
    manna: {
      type: 'boolean',
      label: 'Manna (any duration)',
      description: 'Can hold a manna position momentarily'
    }
  };
  
  /**
   * Front lever abilities assessment form
   */
  const FrontLeverAbilitiesForm = {
    deadHang: {
      type: 'boolean',
      label: 'Dead Hang (30+ seconds)',
      description: 'Can hang from a bar with arms extended'
    },
    archHang: {
      type: 'boolean',
      label: 'Arch Hang (10+ seconds)',
      description: 'Can hang with body in a slight arch'
    },
    tuckFrontLever: {
      type: 'boolean',
      label: 'Tuck Front Lever (5+ seconds)',
      description: 'Can hold a front lever with knees tucked to chest'
    },
    advTuckFrontLever: {
      type: 'boolean',
      label: 'Advanced Tuck Front Lever (5+ seconds)',
      description: 'Can hold a front lever with less knee bend'
    },
    oneLegFrontLever: {
      type: 'boolean',
      label: 'One-Leg Front Lever (3+ seconds)',
      description: 'Can hold a front lever with one leg extended'
    },
    straddleFrontLever: {
      type: 'boolean',
      label: 'Straddle Front Lever (any duration)',
      description: 'Can hold a straddle front lever momentarily'
    },
    fullFrontLever: {
      type: 'boolean',
      label: 'Full Front Lever (any duration)',
      description: 'Can hold a full front lever momentarily'
    }
  };
  
  /**
   * Back lever abilities assessment form
   */
  const BackLeverAbilitiesForm = {
    germanHang: {
      type: 'boolean',
      label: 'German Hang (20+ seconds)',
      description: 'Can hang with shoulders rotated and facing backward'
    },
    tuckBackLever: {
      type: 'boolean',
      label: 'Tuck Back Lever (5+ seconds)',
      description: 'Can hold a back lever with knees tucked to chest'
    },
    advTuckBackLever: {
      type: 'boolean',
      label: 'Advanced Tuck Back Lever (5+ seconds)',
      description: 'Can hold a back lever with less knee bend'
    },
    oneLegBackLever: {
      type: 'boolean',
      label: 'One-Leg Back Lever (3+ seconds)',
      description: 'Can hold a back lever with one leg extended'
    },
    straddleBackLever: {
      type: 'boolean',
      label: 'Straddle Back Lever (any duration)',
      description: 'Can hold a straddle back lever momentarily'
    },
    fullBackLever: {
      type: 'boolean',
      label: 'Full Back Lever (any duration)',
      description: 'Can hold a full back lever momentarily'
    }
  };
  
  /**
   * User workout preferences form
   */
  const WorkoutPreferencesForm = {
    workoutDuration: {
      type: 'select',
      required: true,
      label: 'Preferred Workout Duration',
      options: [
        { value: 15, label: '15 minutes (Quick)' },
        { value: 30, label: '30 minutes (Standard)' },
        { value: 45, label: '45 minutes (Full)' },
        { value: 60, label: '60 minutes (Extended)' }
      ],
      default: 30
    },
    workoutFrequency: {
      type: 'select',
      required: true,
      label: 'Preferred Weekly Frequency',
      options: [
        { value: 2, label: '2 times per week' },
        { value: 3, label: '3 times per week' },
        { value: 4, label: '4 times per week' },
        { value: 5, label: '5 times per week' },
        { value: 6, label: '6 times per week' }
      ],
      default: 3
    },
    focusAreas: {
      type: 'multiselect',
      required: false,
      label: 'Focus Areas',
      options: [
        { value: 'shoulders', label: 'Shoulders' },
        { value: 'chest', label: 'Chest' },
        { value: 'back', label: 'Back' },
        { value: 'arms', label: 'Arms' },
        { value: 'core', label: 'Core' },
        { value: 'legs', label: 'Legs' },
        { value: 'balance', label: 'Balance' },
        { value: 'flexibility', label: 'Flexibility' }
      ]
    },
    skillPriorities: {
      type: 'priorityList',
      required: true,
      label: 'Skill Priorities',
      options: [
        { value: 'handstand', label: 'Handstand' },
        { value: 'planche', label: 'Planche' },
        { value: 'lsit', label: 'L-Sit' },
        { value: 'frontLever', label: 'Front Lever' },
        { value: 'backLever', label: 'Back Lever' }
      ],
      description: 'Drag to reorder skills based on your priorities'
    },
    equipment: {
      type: 'multiselect',
      required: false,
      label: 'Available Equipment',
      options: [
        { value: 'none', label: 'None (Bodyweight only)' },
        { value: 'pullup-bar', label: 'Pull-up Bar' },
        { value: 'dip-bars', label: 'Dip Bars / Parallel Bars' },
        { value: 'rings', label: 'Gymnastics Rings' },
        { value: 'resistance-bands', label: 'Resistance Bands' },
        { value: 'weights', label: 'Weights (Dumbbells/Kettlebells)' },
        { value: 'box', label: 'Plyo Box / Elevated Surface' }
      ]
    },
    preferredWorkoutTime: {
      type: 'select',
      required: false,
      label: 'Preferred Workout Time',
      options: [
        { value: 'morning', label: 'Morning' },
        { value: 'afternoon', label: 'Afternoon' },
        { value: 'evening', label: 'Evening' },
        { value: 'flexible', label: 'Flexible' }
      ],
      default: 'flexible'
    },
    restDays: {
      type: 'multiselect',
      required: false,
      label: 'Preferred Rest Days',
      options: [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
      ],
      description: 'Select days you prefer to rest (optional)'
    },
    workoutReminders: {
      type: 'boolean',
      required: false,
      label: 'Enable Workout Reminders',
      default: true
    }
  };
  
  /**
   * Health information form
   */
  const HealthInfoForm = {
    injuries: {
      type: 'multiselect',
      required: false,
      label: 'Current or Previous Injuries',
      options: [
        { value: 'shoulders', label: 'Shoulders' },
        { value: 'wrists', label: 'Wrists' },
        { value: 'elbows', label: 'Elbows' },
        { value: 'back', label: 'Back' },
        { value: 'hips', label: 'Hips' },
        { value: 'knees', label: 'Knees' },
        { value: 'ankles', label: 'Ankles' },
        { value: 'other', label: 'Other' },
        { value: 'none', label: 'None' }
      ]
    },
    injuryDetails: {
      type: 'textarea',
      required: false,
      label: 'Injury Details',
      placeholder: 'Briefly describe your injuries and how they affect your training',
      maxLength: 500,
      condition: 'injuries.includes("other") || (injuries.length > 0 && !injuries.includes("none"))'
    },
    limitations: {
      type: 'multiselect',
      required: false,
      label: 'Movement Limitations',
      options: [
        { value: 'overhead-pressing', label: 'Overhead Pressing' },
        { value: 'pushing', label: 'Pushing Movements' },
        { value: 'pulling', label: 'Pulling Movements' },
        { value: 'squatting', label: 'Squatting' },
        { value: 'hinging', label: 'Hip Hinging' },
        { value: 'wrist-extension', label: 'Wrist Extension' },
        { value: 'wrist-flexion', label: 'Wrist Flexion' },
        { value: 'other', label: 'Other' },
        { value: 'none', label: 'None' }
      ]
    },
    limitationDetails: {
      type: 'textarea',
      required: false,
      label: 'Limitation Details',
      placeholder: 'Briefly describe your movement limitations',
      maxLength: 500,
      condition: 'limitations.includes("other") || (limitations.length > 0 && !limitations.includes("none"))'
    },
    medicalConditions: {
      type: 'multiselect',
      required: false,
      label: 'Relevant Medical Conditions',
      options: [
        { value: 'hypertension', label: 'High Blood Pressure' },
        { value: 'heart-condition', label: 'Heart Condition' },
        { value: 'asthma', label: 'Asthma' },
        { value: 'diabetes', label: 'Diabetes' },
        { value: 'arthritis', label: 'Arthritis' },
        { value: 'other', label: 'Other' },
        { value: 'none', label: 'None' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
      ]
    },
    medicalDetails: {
      type: 'textarea',
      required: false,
      label: 'Medical Details',
      placeholder: 'Briefly describe any medical conditions that may affect your training',
      maxLength: 500,
      condition: 'medicalConditions.includes("other") || (medicalConditions.length > 0 && !medicalConditions.includes("none") && !medicalConditions.includes("prefer-not-to-say"))'
    },
    disclaimer: {
      type: 'checkbox',
      required: true,
      label: 'I understand that this app is not a substitute for medical advice. I have consulted with a healthcare professional before starting this exercise program if I have any medical conditions or injuries.'
    }
  };
  
  /**
   * User goals form
   */
  const GoalsForm = {
    primarySkill: {
      type: 'select',
      required: true,
      label: 'Primary Skill Goal',
      options: [
        { value: 'handstand', label: 'Handstand' },
        { value: 'planche', label: 'Planche' },
        { value: 'lsit', label: 'L-Sit' },
        { value: 'frontLever', label: 'Front Lever' },
        { value: 'backLever', label: 'Back Lever' }
      ],
      description: 'Which skill do you want to focus on most?'
    },
    specificGoal: {
      type: 'select',
      required: true,
      label: 'Specific Target',
      options: {
        'handstand': [
          { value: 'wall-handstand-60s', label: 'Hold a wall handstand for 60 seconds' },
          { value: 'freestanding-10s', label: 'Hold a freestanding handstand for 10 seconds' },
          { value: 'handstand-walk', label: 'Walk in a handstand' },
          { value: 'handstand-pushup', label: 'Perform a handstand push-up' }
        ],
        'planche': [
          { value: 'tuck-planche-10s', label: 'Hold a tuck planche for 10 seconds' },
          { value: 'adv-tuck-planche-10s', label: 'Hold an advanced tuck planche for 10 seconds' },
          { value: 'straddle-planche-5s', label: 'Hold a straddle planche for 5 seconds' },
          { value: 'full-planche', label: 'Achieve a full planche' }
        ],
        'lsit': [
          { value: 'lsit-15s', label: 'Hold an L-sit for 15 seconds' },
          { value: 'lsit-30s', label: 'Hold an L-sit for 30 seconds' },
          { value: 'vsit-10s', label: 'Hold a V-sit for 10 seconds' },
          { value: 'manna', label: 'Achieve a manna' }
        ],
        'frontLever': [
          { value: 'tuck-fl-10s', label: 'Hold a tuck front lever for 10 seconds' },
          { value: 'adv-tuck-fl-10s', label: 'Hold an advanced tuck front lever for 10 seconds' },
          { value: 'straddle-fl-5s', label: 'Hold a straddle front lever for 5 seconds' },
          { value: 'full-fl', label: 'Achieve a full front lever' }
        ],
        'backLever': [
          { value: 'tuck-bl-10s', label: 'Hold a tuck back lever for 10 seconds' },
          { value: 'adv-tuck-bl-10s', label: 'Hold an advanced tuck back lever for 10 seconds' },
          { value: 'straddle-bl-5s', label: 'Hold a straddle back lever for 5 seconds' },
          { value: 'full-bl', label: 'Achieve a full back lever' }
        ]
      },
      description: 'What specific goal do you want to achieve?',
      dependsOn: 'primarySkill'
    },
    targetDate: {
      type: 'date',
      required: false,
      label: 'Target Achievement Date',
      description: 'When do you aim to achieve this goal?',
      min: 'today',
      max: '+1year'
    },
    weeklyWorkouts: {
      type: 'number',
      required: true,
      label: 'Weekly Workout Goal',
      description: 'How many workouts do you aim to complete weekly?',
      min: 1,
      max: 7,
      default: 3
    },
    secondaryGoals: {
      type: 'multiselect',
      required: false,
      label: 'Secondary Goals',
      options: [
        { value: 'strength', label: 'Build strength' },
        { value: 'muscle', label: 'Build muscle' },
        { value: 'fat-loss', label: 'Lose fat' },
        { value: 'endurance', label: 'Improve endurance' },
        { value: 'flexibility', label: 'Improve flexibility' },
        { value: 'consistency', label: 'Build consistent habit' },
        { value: 'recovery', label: 'Improve recovery' }
      ],
      description: 'What other goals do you have?'
    },
    notes: {
      type: 'textarea',
      required: false,
      label: 'Additional Notes',
      placeholder: 'Any other goals or considerations?',
      maxLength: 500
    }
  };
  
  /**
   * Complete skills assessment form
   */
  const SkillsAssessmentForm = {
    handstand: HandstandAbilitiesForm,
    planche: PlancheAbilitiesForm,
    lsit: LSitAbilitiesForm,
    frontLever: FrontLeverAbilitiesForm,
    backLever: BackLeverAbilitiesForm
  };
  
  // Export all forms
  module.exports = {
    BasicInfoForm,
    FitnessLevelForm,
    SkillsAssessmentForm,
    WorkoutPreferencesForm,
    HealthInfoForm,
    GoalsForm,
    
    // Individual skill assessment forms
    HandstandAbilitiesForm,
    PlancheAbilitiesForm,
    LSitAbilitiesForm,
    FrontLeverAbilitiesForm,
    BackLeverAbilitiesForm
  };