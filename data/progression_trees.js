const ProgressionNode = require('../models/progression_node');

/**
 * Initialize and build progression trees for various skills
 * @return {Object} - Progression trees organized by skill
 */
function initializeProgressionTrees() {
  const trees = {
    handstand: buildHandstandTree(),
    planche: buildPlancheTree(),
    lsit: buildLSitTree(),
    frontLever: buildFrontLeverTree(),
    backLever: buildBackLeverTree()
  };

  return trees;
}

function buildHandstandTree() {
  const wallPlank = new ProgressionNode('hs-wall-plank', 'Wall Plank', 1, 'handstand', ['wu-plank'], [], { holdTime: 60 });
  const pikePushup = new ProgressionNode('hs-pike-pushup', 'Pike Push-up', 2, 'handstand', ['st-pushup'], ['hs-wall-plank'], { reps: 10 });
  const wallWalk = new ProgressionNode('hs-wall-walk', 'Wall Walk', 3, 'handstand', [], ['hs-wall-plank'], { reps: 5 });
  const wallHandstand = new ProgressionNode('hs-wall-handstand', 'Wall Handstand', 4, 'handstand', ['hs-wall-hold'], ['hs-pike-pushup', 'hs-wall-walk'], { holdTime: 60 });
  const chestToWall = new ProgressionNode('hs-chest-to-wall', 'Chest-to-Wall Handstand', 5, 'handstand', ['hs-chest-to-wall'], ['hs-wall-handstand'], { holdTime: 60 });
  const toePulls = new ProgressionNode('hs-toe-pulls', 'Handstand Toe Pulls', 6, 'handstand', ['hs-toe-pulls'], ['hs-chest-to-wall'], { reps: 10, consecutiveSuccesses: 3 });
  const heelPulls = new ProgressionNode('hs-heel-pulls', 'Handstand Heel Pulls', 7, 'handstand', ['hs-heel-pulls'], ['hs-toe-pulls'], { reps: 10, consecutiveSuccesses: 3 });
  const freestanding = new ProgressionNode('hs-freestanding', 'Freestanding Handstand', 8, 'handstand', ['hs-freestanding'], ['hs-heel-pulls'], { holdTime: 30, consecutiveSuccesses: 3 });
  const freestandingPushup = new ProgressionNode('hs-freestanding-pushup', 'Handstand Push-up', 9, 'handstand', [], ['hs-freestanding'], { reps: 3, consecutiveSuccesses: 3 });

  wallPlank.addNextNode(pikePushup);
  wallPlank.addNextNode(wallWalk);
  pikePushup.addNextNode(wallHandstand);
  wallWalk.addNextNode(wallHandstand);
  wallHandstand.addNextNode(chestToWall);
  chestToWall.addNextNode(toePulls);
  toePulls.addNextNode(heelPulls);
  heelPulls.addNextNode(freestanding);
  freestanding.addNextNode(freestandingPushup);

  const nodes = {
    'hs-wall-plank': wallPlank,
    'hs-pike-pushup': pikePushup,
    'hs-wall-walk': wallWalk,
    'hs-wall-handstand': wallHandstand,
    'hs-chest-to-wall': chestToWall,
    'hs-toe-pulls': toePulls,
    'hs-heel-pulls': heelPulls,
    'hs-freestanding': freestanding,
    'hs-freestanding-pushup': freestandingPushup
  };

  return { nodes, root: wallPlank, skill: 'handstand' };
}

function buildPlancheTree() {
  const plank = new ProgressionNode('pl-plank', 'Plank', 1, 'planche', ['pl-plank'], [], { holdTime: 60 });
  const elevatedPlank = new ProgressionNode('pl-elevated-plank', 'Elevated Plank', 2, 'planche', ['pl-elevated-plank'], ['pl-plank'], { holdTime: 45 });
  const pseudoPlanche = new ProgressionNode('pl-pseudo-planche', 'Pseudo Planche', 3, 'planche', ['pl-pseudo-planche'], ['pl-elevated-plank'], { holdTime: 30 });
  const plancheLeans = new ProgressionNode('pl-planche-leans', 'Planche Leans', 4, 'planche', [], ['pl-pseudo-planche'], { holdTime: 30 });
  const tuckPlanche = new ProgressionNode('pl-tuck-planche', 'Tuck Planche', 5, 'planche', ['pl-tuck-planche'], ['pl-planche-leans'], { holdTime: 15, consecutiveSuccesses: 3 });
  const advTuckPlanche = new ProgressionNode('pl-adv-tuck-planche', 'Advanced Tuck Planche', 6, 'planche', ['pl-adv-tuck-planche'], ['pl-tuck-planche'], { holdTime: 10, consecutiveSuccesses: 3 });
  const stradPlanche = new ProgressionNode('pl-straddle-planche', 'Straddle Planche', 8, 'planche', [], ['pl-adv-tuck-planche'], { holdTime: 5, consecutiveSuccesses: 3 });
  const fullPlanche = new ProgressionNode('pl-full-planche', 'Full Planche', 10, 'planche', [], ['pl-straddle-planche'], { holdTime: 3, consecutiveSuccesses: 3 });

  plank.addNextNode(elevatedPlank);
  elevatedPlank.addNextNode(pseudoPlanche);
  pseudoPlanche.addNextNode(plancheLeans);
  plancheLeans.addNextNode(tuckPlanche);
  tuckPlanche.addNextNode(advTuckPlanche);
  advTuckPlanche.addNextNode(stradPlanche);
  stradPlanche.addNextNode(fullPlanche);

  const nodes = {
    'pl-plank': plank,
    'pl-elevated-plank': elevatedPlank,
    'pl-pseudo-planche': pseudoPlanche,
    'pl-planche-leans': plancheLeans,
    'pl-tuck-planche': tuckPlanche,
    'pl-adv-tuck-planche': advTuckPlanche,
    'pl-straddle-planche': stradPlanche,
    'pl-full-planche': fullPlanche
  };

  return { nodes, root: plank, skill: 'planche' };
}

function buildLSitTree() {
  const footSupported = new ProgressionNode('ls-foot-supported', 'Foot Supported L-Sit', 1, 'lsit', [], [], { holdTime: 30 });
  const oneFootSupported = new ProgressionNode('ls-one-foot', 'One-Foot Supported L-Sit', 2, 'lsit', [], ['ls-foot-supported'], { holdTime: 30 });
  const tuckLSit = new ProgressionNode('ls-tuck', 'Tuck L-Sit', 3, 'lsit', ['ls-supported-tuck'], ['ls-one-foot'], { holdTime: 15, consecutiveSuccesses: 3 });
  const oneLegLSit = new ProgressionNode('ls-one-leg', 'One-Leg L-Sit', 4, 'lsit', ['ls-one-leg-ext'], ['ls-tuck'], { holdTime: 15, consecutiveSuccesses: 3 });
  const fullLSit = new ProgressionNode('ls-full', 'Full L-Sit', 5, 'lsit', ['ls-full-lsit'], ['ls-one-leg'], { holdTime: 30, consecutiveSuccesses: 3 });
  const vSit = new ProgressionNode('ls-v-sit', 'V-Sit', 7, 'lsit', [], ['ls-full'], { holdTime: 10, consecutiveSuccesses: 3 });

  footSupported.addNextNode(oneFootSupported);
  oneFootSupported.addNextNode(tuckLSit);
  tuckLSit.addNextNode(oneLegLSit);
  oneLegLSit.addNextNode(fullLSit);
  fullLSit.addNextNode(vSit);

  const nodes = {
    'ls-foot-supported': footSupported,
    'ls-one-foot': oneFootSupported,
    'ls-tuck': tuckLSit,
    'ls-one-leg': oneLegLSit,
    'ls-full': fullLSit,
    'ls-v-sit': vSit
  };

  return { nodes, root: footSupported, skill: 'lsit' };
}

function buildFrontLeverTree() {
  const nodes = {};
  return { nodes, skill: 'frontLever' };
}

function buildBackLeverTree() {
  const nodes = {};
  return { nodes, skill: 'backLever' };
}

module.exports = { initializeProgressionTrees };
