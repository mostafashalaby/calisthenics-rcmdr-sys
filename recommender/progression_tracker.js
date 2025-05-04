class ProgressionTracker {
  constructor(progressionTrees) {
    this.progressionTrees = progressionTrees;
  }

  getNextProgressionNode(userProfile, skill) {
    const skillTree = this.progressionTrees[skill];
    if (!skillTree || !skillTree.nodes) return null;

    const completedNodes = userProfile.completedNodes[skill] || [];
    const userLevel = userProfile.skillLevels[skill] || 1;

    const accessibleNodes = Object.values(skillTree.nodes).filter(node =>
      node.isAccessible(completedNodes) &&
      !completedNodes.includes(node.id) &&
      node.level <= userLevel + 2
    );

    if (accessibleNodes.length === 0) return null;

    accessibleNodes.sort((a, b) => a.level - b.level);
    return accessibleNodes[0];
  }

  updateSkillLevel(userProfile, skill) {
    const skillTree = this.progressionTrees[skill];
    if (!skillTree || !skillTree.nodes) return userProfile.skillLevels[skill] || 1;

    const completedNodes = userProfile.completedNodes[skill] || [];
    let highestLevel = 1;

    completedNodes.forEach(nodeId => {
      const node = skillTree.nodes[nodeId];
      if (node && node.level > highestLevel) {
        highestLevel = node.level;
      }
    });

    userProfile.updateSkillLevel(skill, highestLevel);
    return highestLevel;
  }

  hasNodeMastered(userProfile, skill, nodeId) {
    const skillTree = this.progressionTrees[skill];
    if (!skillTree || !skillTree.nodes[nodeId]) return false;

    const node = skillTree.nodes[nodeId];
    const perf = userProfile.performanceMetrics[nodeId];
    return node.hasMastered(perf);
  }

  getSkillProgressionPath(userProfile, skill) {
    const skillTree = this.progressionTrees[skill];
    if (!skillTree || !skillTree.nodes || !skillTree.root) return [];
  
    const completed = userProfile.completedNodes[skill] || [];
    const userLevel = userProfile.skillLevels[skill] || 1;
  
    const path = [];
    const visited = new Set();
  
    const dfs = node => {
      if (!node || visited.has(node.id)) return;
      visited.add(node.id);
      path.push(node);
  
      for (const next of node.nextNodes) {
        const isAccessible = next.isAccessible(completed);
        const withinLevel = next.level <= userLevel + 2;
        console.log(`Checking node: ${next.id}, accessible: ${isAccessible}, levelOK: ${withinLevel}`);
        if (isAccessible && withinLevel) {
          dfs(next);
        }
      }
    };
  
    dfs(skillTree.root);
    return path;
  }
  
  generateSkillDevelopmentPlan(userProfile, skill, weeks = 4) {
    const path = this.getSkillProgressionPath(userProfile, skill);
    const completed = userProfile.completedNodes[skill] || [];

    let targetNode = null;
    for (const node of path) {
      if (!completed.includes(node.id)) {
        targetNode = node;
        break;
      }
    }

    if (!targetNode && path.length > 0) {
      targetNode = path[path.length - 1];
    }

    if (!targetNode) {
      return {
        skill,
        currentLevel: userProfile.skillLevels[skill] || 1,
        plan: []
      };
    }

    const plan = [];

    for (let week = 0; week < weeks; week++) {
      const weekPlan = {
        week: week + 1,
        focus: targetNode.name,
        exercises: targetNode.exerciseIds || [],
        goals: {}
      };

      if (targetNode.criteria) {
        if (targetNode.criteria.holdTime) {
          weekPlan.goals.holdTime = this.calculateProgressiveGoal(
            targetNode.criteria.holdTime,
            week,
            weeks
          );
        }
        if (targetNode.criteria.reps) {
          weekPlan.goals.reps = this.calculateProgressiveGoal(
            targetNode.criteria.reps,
            week,
            weeks
          );
        }
      }

      plan.push(weekPlan);
    }

    return {
      skill,
      currentLevel: userProfile.skillLevels[skill] || 1,
      targetNode: targetNode.name,
      plan
    };
  }

  estimateReadiness(userProfile, skill) {
    const history = userProfile.workoutHistory || [];
    const recent = history.filter(w => w.focusSkill === skill).slice(-3);
    const avg = recent.reduce((sum, w) => sum + (w.rating || 0), 0) / recent.length;

    if (avg >= 4 && recent.length >= 2) {
      userProfile.skillLevels[skill] += 1;
      return true;
    }

    return false;
  }

  calculateProgressiveGoal(target, currentWeek, totalWeeks) {
    const start = 0.6;
    const progress = (1 - start) * (currentWeek / (totalWeeks - 1));
    const percentage = start + progress;
    return Math.round(target * percentage);
  }
}

module.exports = ProgressionTracker;
