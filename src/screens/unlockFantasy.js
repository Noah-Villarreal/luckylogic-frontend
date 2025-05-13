// src/utils/unlockFantasy.js

export function unlockFantasyAccess() {
  const today = new Date().toDateString();
  const now = new Date().toISOString();

  const data = JSON.parse(localStorage.getItem('loyaltyTracker')) || {
    daysOpened: [],
    fantasyUnlocked: false,
    fantasyEntryNumber: null,
    lastOpened: null,
    inactiveDays: 0,
  };

  // Track daily open
  if (!data.daysOpened.includes(today)) {
    data.daysOpened.push(today);
  }

  // Inactivity tracking
  if (data.lastOpened) {
    const last = new Date(data.lastOpened);
    const diffDays = Math.floor((new Date() - last) / (1000 * 60 * 60 * 24));
    if (diffDays >= 1) {
      data.inactiveDays += diffDays;
    } else {
      data.inactiveDays = 0;
    }
  }

  data.lastOpened = now;
  localStorage.setItem('loyaltyTracker', JSON.stringify(data));

  const streak = data.daysOpened.slice(-3).length === 3 &&
                 new Set(data.daysOpened.slice(-3)).size === 3;

  const leaderboard = JSON.parse(localStorage.getItem('fantasyLeaderboard')) || [];

  // Auto-drop inactive users after 14 days
  if (data.fantasyEntryNumber && data.inactiveDays >= 14) {
    const updated = leaderboard.filter(user => user.code !== data.fantasyEntryNumber);
    localStorage.setItem('fantasyLeaderboard', JSON.stringify(updated));
    localStorage.removeItem('fantasyUnlocked');
    localStorage.removeItem('fantasyEntryNumber');
    data.fantasyUnlocked = false;
    data.fantasyEntryNumber = null;
    localStorage.setItem('loyaltyTracker', JSON.stringify(data));
    return { dropped: true, message: "You were dropped for inactivity." };
  }

  if (data.fantasyUnlocked) {
    return { unlocked: true, number: data.fantasyEntryNumber };
  }

  if (streak && leaderboard.length < 1000) {
    let newNumber;
    if (leaderboard.length === 0) {
      newNumber = 1; // Reserved for Noah
    } else {
      newNumber = leaderboard.length + 1;
    }

    data.fantasyUnlocked = true;
    data.fantasyEntryNumber = newNumber;

    leaderboard.push({ number: newNumber, code: newNumber, timestamp: now });
    localStorage.setItem('fantasyLeaderboard', JSON.stringify(leaderboard));
    localStorage.setItem('fantasyUnlocked', true);
    localStorage.setItem('fantasyEntryNumber', newNumber);
    localStorage.setItem('loyaltyTracker', JSON.stringify(data));

    return { unlocked: true, number: newNumber };
  }

  if (leaderboard.length >= 1000 && !data.fantasyUnlocked) {
    const queuePosition = getWaitlistPosition(data);
    return { waitlisted: true, position: queuePosition };
  }

  return { streaking: true, days: data.daysOpened.length };
}

function getWaitlistPosition(data) {
  const queue = JSON.parse(localStorage.getItem('fantasyWaitlist')) || [];
  const existing = queue.find(q => q.lastOpened === data.lastOpened);
  if (existing) return existing.position;

  const newPosition = queue.length + 1;
  queue.push({ position: newPosition, lastOpened: data.lastOpened });
  localStorage.setItem('fantasyWaitlist', JSON.stringify(queue));
  return newPosition;
}