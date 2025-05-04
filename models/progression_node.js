/**
 * ProgressionNode class representing a node in a skill progression tree
 */
class ProgressionNode {
  /**
   * Create a new progression node
   * @param {string} id - Unique identifier for the node
   * @param {string} name - Name of this progression step
   * @param {number} level - Global difficulty level (e.g., 1–10+)
   * @param {string} skillType - Type of skill (e.g., 'handstand', 'planche')
   * @param {string[]} exerciseIds - IDs of exercises associated with this node
   * @param {string[]} prerequisites - IDs of nodes that must be mastered before this one
   * @param {Object} criteria - Mastery criteria (e.g., { reps: 10, holdTime: 30, consecutiveSuccesses: 3 })
   */
  constructor(id, name, level, skillType, exerciseIds = [], prerequisites = [], criteria = {}) {
    this.id = id;
    this.name = name;
    this.level = level; // global integer skill level
    this.skillType = skillType;
    this.exerciseIds = exerciseIds;
    this.prerequisites = prerequisites;
    this.criteria = criteria;
    this.nextNodes = []; // connected future nodes
  }

  /**
   * Add a node that follows this one in the progression
   * @param {ProgressionNode} node - The next node in the progression
   */
  addNextNode(node) {
    this.nextNodes.push(node);
  }

  /**
   * Check if the node is accessible given completed prerequisites
   * @param {string[]} completedNodeIds - IDs of completed nodes
   * @return {boolean}
   */
  isAccessible(completedNodeIds) {
    return this.prerequisites.every(req => completedNodeIds.includes(req));
  }

  /**
   * Check if the user has mastered this node
   * @param {Object} userPerformance - Object containing rep/time/consecutive success data
   * @return {boolean}
   */
  hasMastered(userPerformance) {
    if (!userPerformance || Object.keys(this.criteria).length === 0) return false;

    if (this.criteria.reps && (!userPerformance.maxReps || userPerformance.maxReps < this.criteria.reps)) {
      return false;
    }

    if (this.criteria.holdTime && (!userPerformance.maxTime || userPerformance.maxTime < this.criteria.holdTime)) {
      return false;
    }

    if (this.criteria.consecutiveSuccesses &&
        (!userPerformance.consecutiveSuccesses || userPerformance.consecutiveSuccesses < this.criteria.consecutiveSuccesses)) {
      return false;
    }

    return true;
  }

  /**
   * Return a list of associated exercise objects from the exercise database
   * @param {Object} exerciseDatabase
   * @return {Exercise[]}
   */
  getExercises(exerciseDatabase) {
    return this.exerciseIds.map(id => exerciseDatabase[id]).filter(Boolean);
  }

  /**
   * Return formatted string representation of node
   * @return {string}
   */
  toString() {
    return `${this.name} (Level ${this.level}) - Skill: ${this.skillType}`;
  }
}

module.exports = ProgressionNode;
