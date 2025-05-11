export function unlockFantasyAccess() {
  const tracker = JSON.parse(localStorage.getItem('loyaltyTracker')) || {};
  const days = tracker.daysOpened?.length || 0;

  if (tracker.fantasyUnlocked || tracker.fantasyEntryNumber !== null) {
    updateLastActive(tracker.fantasyEntryNumber);
    return { unlocked: true, number: tracker.fantasyEntryNumber };
  }

  const result = checkForInactiveAndReorder();

  if (result) {
    tracker.fantasyUnlocked = true;
    tracker.fantasyEntryNumber = result;
    localStorage.setItem('loyaltyTracker', JSON.stringify(tracker));
    return { unlocked: true, number: result };
  }

  // If qualified but spots are full, return waitlist position
  if (days >= 5) {
    const assigned = JSON.parse(localStorage.getItem('assignedBadges')) || [];
    const waitlistPosition = assigned.length + 1;

    return {
      unlocked: false,
      waitlisted: true,
      queue: true,
      position: waitlistPosition,
    };
  }

  return { unlocked: false };
}

function assignNumber(min, max) {
  const assigned = JSON.parse(localStorage.getItem('assignedBadges')) || [];
  const nextAvailable = findLowestAvailableNumber(min, max, assigned);
  if (nextAvailable === null) return null;

  const tracker = JSON.parse(localStorage.getItem('loyaltyTracker')) || {};
  tracker.fantasyUnlocked = true;
  tracker.fantasyEntryNumber = nextAvailable;
  localStorage.setItem('loyaltyTracker', JSON.stringify(tracker));

  assigned.push({
    number: nextAvailable,
    lastActive: new Date().toISOString(),
  });

  localStorage.setItem('assignedBadges', JSON.stringify(assigned));
  return nextAvailable;
}

function findLowestAvailableNumber(min, max, assigned) {
  const taken = assigned.map(a => a.number);
  for (let i = min; i <= max; i++) {
    if (!taken.includes(i)) return i;
  }
  return null;
}

function updateLastActive(userNumber) {
  const assigned = JSON.parse(localStorage.getItem('assignedBadges')) || [];
  const updated = assigned.map(user =>
    user.number === userNumber
      ? { ...user, lastActive: new Date().toISOString() }
      : user
  );
  localStorage.setItem('assignedBadges', JSON.stringify(updated));
}

function checkForInactiveAndReorder() {
  const assigned = JSON.parse(localStorage.getItem('assignedBadges')) || [];
  const now = new Date();

  const activeUsers = assigned.filter(user => {
    const last = new Date(user.lastActive);
    const daysInactive = (now - last) / (1000 * 60 * 60 * 24);
    return daysInactive < 3;
  });

  const sorted = activeUsers.sort((a, b) => a.number - b.number);
  const newList = sorted.map((user, index) => ({
    ...user,
    number: index + 1,
  }));

  localStorage.setItem('assignedBadges', JSON.stringify(newList));

  return newList.length < 1000 ? newList.length + 1 : null;
}