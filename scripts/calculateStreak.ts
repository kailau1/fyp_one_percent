import { HabitHistory } from '@/context/HabitsContext';

export function calculateCurrentStreak(history: HabitHistory[]): number {
  const sorted = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  let currentDate = new Date();

  for (let i = 0; i < sorted.length; i++) {
    const entryDate = new Date(sorted[i].date);
    const diffDays = Math.floor(
      (currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0 && sorted[i].completed) {
      streak++;
    } else if (diffDays === streak) {
      if (sorted[i].completed) {
        streak++;
      } else {
        break;
      }
    } else {
      break;
    }
    currentDate.setDate(currentDate.getDate() - 1); 
    
  }

  return streak;
}


export function calculateLongestStreak(history: HabitHistory[]): number {
  if (!history.length) return 0;

  const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let longest = 0;
  let current = 0;

  for (let i = 0; i < sorted.length; i++) {
    const currentDate = new Date(sorted[i].date);

    if (!sorted[i].completed) {
      current = 0;
      continue;
    }

    if (i === 0) {
      current = 1;
      longest = 1;
      continue;
    }

    const prevDate = new Date(sorted[i - 1].date);
    const diffDays = Math.floor(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      current++;
    } else if (diffDays === 0) {
      continue;
    } else {
      current = 1;
    }

    if (current > longest) {
      longest = current;
    }
  }

  return longest;
}
