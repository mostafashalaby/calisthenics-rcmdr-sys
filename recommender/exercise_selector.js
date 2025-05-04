class ExerciseSelector {
  constructor(exerciseDatabase) {
    this.exerciseDatabase = exerciseDatabase;
  }

  selectWarmupExercises(userProfile, duration) {
    const warmups = this.filterByCategory('warmup');
    const count = Math.max(2, Math.floor(duration / 1.5));
    return this.selectByPreferences(warmups, userProfile, count);
  }

  selectSkillExercises(userProfile, duration, focusSkill) {
    const skills = this.filterByCategory('skill');

    const focusExercises = skills.filter(e =>
      e.id.startsWith(focusSkill.slice(0, 2))
    );

    const others = skills.filter(e =>
      !e.id.startsWith(focusSkill.slice(0, 2))
    );

    const count = Math.max(1, Math.floor(duration / 4));

    const focusSelected = this.selectByLevel(focusExercises, userProfile.skillLevels[focusSkill] || 1, Math.ceil(count * 0.7));
    const rest = this.selectByPreferences(others, userProfile, count - focusSelected.length);

    return [...focusSelected, ...rest];
  }

  selectStrengthExercises(userProfile, duration, focusSkill = null) {
    const strengths = this.filterByCategory('strength');
    const count = Math.max(2, Math.floor(duration / 4));

    if (focusSkill) {
      const targetMuscles = this.getTargetMuscles(focusSkill);
      const related = strengths.filter(ex =>
        ex.targetMuscles.some(m => targetMuscles.includes(m))
      );
      const others = strengths.filter(ex =>
        !ex.targetMuscles.some(m => targetMuscles.includes(m))
      );

      const relSelected = this.selectByPreferences(related, userProfile, Math.ceil(count * 0.6));
      const rest = this.selectByPreferences(others, userProfile, count - relSelected.length);
      return [...relSelected, ...rest];
    }

    return this.selectByPreferences(strengths, userProfile, count);
  }

  selectCooldownExercises(userProfile, duration) {
    const cooldowns = this.filterByCategory('cooldown');
    const count = Math.max(2, Math.floor(duration / 1.5));
    return this.selectByPreferences(cooldowns, userProfile, count);
  }

  filterByCategory(category) {
    return Object.values(this.exerciseDatabase).filter(e => e.category === category);
  }

  selectByLevel(exercises, level, count) {
    const suitable = exercises.filter(e =>
      e.progressionLevel >= level - 1 && e.progressionLevel <= level + 1
    );

    if (suitable.length === 0) {
      const sorted = [...exercises].sort((a, b) =>
        Math.abs(a.progressionLevel - level) - Math.abs(b.progressionLevel - level)
      );
      return sorted.slice(0, count);
    }

    return suitable
      .sort((a, b) =>
        Math.abs(a.progressionLevel - level) - Math.abs(b.progressionLevel - level)
      )
      .slice(0, count);
  }

  selectByPreferences(exercises, userProfile, count) {
    const excluded = new Set(userProfile.preferences.excludedExercises || []);
    const available = exercises.filter(e => !excluded.has(e.id));

    const focus = userProfile.preferences.focusAreas || [];

    if (focus.length > 0) {
      const scored = available.map(ex => {
        const overlap = ex.targetMuscles.filter(m => focus.includes(m)).length;
        const primaryMatch = ex.targetMuscles[0] && focus.includes(ex.targetMuscles[0]) ? 1 : 0;
        const score = overlap + primaryMatch + Math.random() * 0.2;
        return { ex, score };
      });

      return scored.sort((a, b) => b.score - a.score).slice(0, count).map(s => s.ex);
    }

    return this.selectRandom(available, count);
  }

  selectRandom(exercises, count) {
    return [...exercises].sort(() => 0.5 - Math.random()).slice(0, count);
  }

  getTargetMuscles(skill) {
    const map = {
      handstand: ['shoulders', 'core', 'wrists', 'balance'],
      planche: ['shoulders', 'chest', 'core', 'wrists'],
      lsit: ['core', 'hip-flexors', 'triceps'],
      frontLever: ['back', 'lats', 'core'],
      backLever: ['back', 'lats', 'biceps']
    };
    return map[skill] || ['core'];
  }

  findEasierAlternative(exercise, userProfile) {
    const candidates = Object.values(this.exerciseDatabase).filter(e =>
      e.category === exercise.category &&
      e.progressionLevel < exercise.progressionLevel &&
      !userProfile.preferences.excludedExercises.includes(e.id)
    );
    return candidates.sort((a, b) => b.progressionLevel - a.progressionLevel)[0] || null;
  }

  findHarderAlternative(exercise, userProfile) {
    const candidates = Object.values(this.exerciseDatabase).filter(e =>
      e.category === exercise.category &&
      e.progressionLevel > exercise.progressionLevel &&
      !userProfile.preferences.excludedExercises.includes(e.id)
    );
    return candidates.sort((a, b) => a.progressionLevel - b.progressionLevel)[0] || null;
  }
}

module.exports = ExerciseSelector;
