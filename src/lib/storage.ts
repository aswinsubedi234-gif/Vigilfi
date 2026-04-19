// Score history & achievements — all localStorage, zero backend

export interface ScoreEntry {
  testId: string;
  score: number;
  date: string; // ISO string
  percentile: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

const SCORE_KEY = 'vigilfi_scores';
const ACHIEVEMENT_KEY = 'vigilfi_achievements';
const STREAK_KEY = 'vigilfi_streak';

// ─── Score History ───────────────────────────────────────────

export function saveScore(testId: string, score: number, percentile: number): void {
  if (typeof window === 'undefined') return;
  const history = getScoreHistory();
  history.push({
    testId,
    score,
    date: new Date().toISOString(),
    percentile,
  });
  // Keep last 200 scores max
  if (history.length > 200) history.splice(0, history.length - 200);
  localStorage.setItem(SCORE_KEY, JSON.stringify(history));
}

export function getScoreHistory(): ScoreEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(SCORE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getTestHistory(testId: string): ScoreEntry[] {
  return getScoreHistory().filter(s => s.testId === testId);
}

export function getBestScore(testId: string, higherIsBetter: boolean): ScoreEntry | null {
  const history = getTestHistory(testId);
  if (history.length === 0) return null;
  return history.reduce((best, current) => {
    if (higherIsBetter) return current.score > best.score ? current : best;
    return current.score < best.score ? current : best;
  });
}

export function getTotalTestsTaken(): number {
  return getScoreHistory().length;
}

export function getUniqueTestsTaken(): number {
  const ids = new Set(getScoreHistory().map(s => s.testId));
  return ids.size;
}

// ─── Streak Tracking ────────────────────────────────────────

interface StreakData {
  currentStreak: number;
  lastDate: string; // YYYY-MM-DD
  longestStreak: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function updateStreak(): StreakData {
  if (typeof window === 'undefined') return { currentStreak: 0, lastDate: '', longestStreak: 0 };
  
  const today = getToday();
  let data: StreakData;
  
  try {
    data = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
    if (!data.currentStreak) data = { currentStreak: 0, lastDate: '', longestStreak: 0 };
  } catch {
    data = { currentStreak: 0, lastDate: '', longestStreak: 0 };
  }

  if (data.lastDate === today) {
    // Already logged today
    return data;
  } else if (data.lastDate === getYesterday()) {
    // Consecutive day
    data.currentStreak++;
  } else {
    // Streak broken
    data.currentStreak = 1;
  }

  data.lastDate = today;
  data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  return data;
}

export function getStreak(): StreakData {
  if (typeof window === 'undefined') return { currentStreak: 0, lastDate: '', longestStreak: 0 };
  try {
    const data = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
    // Check if streak is still valid
    if (data.lastDate && data.lastDate !== getToday() && data.lastDate !== getYesterday()) {
      return { currentStreak: 0, lastDate: data.lastDate, longestStreak: data.longestStreak || 0 };
    }
    return data.currentStreak ? data : { currentStreak: 0, lastDate: '', longestStreak: 0 };
  } catch {
    return { currentStreak: 0, lastDate: '', longestStreak: 0 };
  }
}

// ─── Achievements ───────────────────────────────────────────

export const ACHIEVEMENT_DEFS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  { id: 'first-test', name: 'First Steps', description: 'Complete your first test', icon: '🎯' },
  { id: 'all-tests', name: 'Renaissance Mind', description: 'Complete all 9 tests', icon: '🧠' },
  { id: 'speed-demon', name: 'Speed Demon', description: 'Score under 200ms in Reaction Time', icon: '⚡' },
  { id: 'lightning', name: 'Lightning Reflexes', description: 'Score under 150ms in Reaction Time', icon: '🌩️' },
  { id: 'fast-typer', name: 'Keyboard Warrior', description: 'Type over 60 WPM', icon: '⌨️' },
  { id: 'speed-typer', name: 'Speed Typist', description: 'Type over 80 WPM', icon: '🏎️' },
  { id: 'memory-master', name: 'Memory Master', description: 'Remember 10+ digits', icon: '🔢' },
  { id: 'eagle-eye', name: 'Eagle Eye', description: 'Reach level 20 in Color Perception', icon: '🦅' },
  { id: 'sharp-eyes', name: 'Sharp Eyes', description: 'Reach level 25 in Color Perception', icon: '👁️' },
  { id: 'pattern-pro', name: 'Pattern Pro', description: 'Reach level 10 in Sequence Memory', icon: '🧩' },
  { id: 'visual-genius', name: 'Visual Genius', description: 'Reach level 10 in Visual Memory', icon: '🎨' },
  { id: 'streak-3', name: 'Hat Trick', description: '3-day testing streak', icon: '🔥' },
  { id: 'streak-7', name: 'Weekly Warrior', description: '7-day testing streak', icon: '💪' },
  { id: 'ten-tests', name: 'Dedicated', description: 'Complete 10 tests total', icon: '🏆' },
  { id: 'fifty-tests', name: 'Obsessed', description: 'Complete 50 tests total', icon: '💎' },
  { id: 'architect', name: 'The Architect', description: 'Reach level 15 in Spatial Reasoning', icon: '🏛️' },
  { id: 'silverback', name: 'The Silverback', description: 'Reach level 12 in the Chimp Test', icon: '🦍' },
];

export function getAchievements(): Achievement[] {
  if (typeof window === 'undefined') return ACHIEVEMENT_DEFS.map(a => ({ ...a, unlocked: false }));
  try {
    const unlocked: Record<string, string> = JSON.parse(localStorage.getItem(ACHIEVEMENT_KEY) || '{}');
    return ACHIEVEMENT_DEFS.map(a => ({
      ...a,
      unlocked: !!unlocked[a.id],
      unlockedAt: unlocked[a.id],
    }));
  } catch {
    return ACHIEVEMENT_DEFS.map(a => ({ ...a, unlocked: false }));
  }
}

export function unlockAchievement(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const unlocked: Record<string, string> = JSON.parse(localStorage.getItem(ACHIEVEMENT_KEY) || '{}');
    if (unlocked[id]) return false; // Already unlocked
    unlocked[id] = new Date().toISOString();
    localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(unlocked));
    return true; // Newly unlocked!
  } catch {
    return false;
  }
}

// Check achievements after a test
export function checkAchievements(testId: string, score: number): string[] {
  const newlyUnlocked: string[] = [];
  const totalTests = getTotalTestsTaken();
  const uniqueTests = getUniqueTestsTaken();
  const streak = getStreak();

  // First test
  if (totalTests >= 1 && unlockAchievement('first-test')) newlyUnlocked.push('first-test');

  // All tests
  if (uniqueTests >= 9 && unlockAchievement('all-tests')) newlyUnlocked.push('all-tests');

  // Count-based
  if (totalTests >= 10 && unlockAchievement('ten-tests')) newlyUnlocked.push('ten-tests');
  if (totalTests >= 50 && unlockAchievement('fifty-tests')) newlyUnlocked.push('fifty-tests');

  // Streak-based
  if (streak.currentStreak >= 3 && unlockAchievement('streak-3')) newlyUnlocked.push('streak-3');
  if (streak.currentStreak >= 7 && unlockAchievement('streak-7')) newlyUnlocked.push('streak-7');

  // Test-specific
  if (testId === 'reaction-time') {
    if (score < 200 && unlockAchievement('speed-demon')) newlyUnlocked.push('speed-demon');
    if (score < 150 && unlockAchievement('lightning')) newlyUnlocked.push('lightning');
  }
  if (testId === 'typing-speed') {
    if (score > 60 && unlockAchievement('fast-typer')) newlyUnlocked.push('fast-typer');
    if (score > 80 && unlockAchievement('speed-typer')) newlyUnlocked.push('speed-typer');
  }
  if (testId === 'number-memory') {
    if (score >= 10 && unlockAchievement('memory-master')) newlyUnlocked.push('memory-master');
  }
  if (testId === 'color-perception') {
    if (score >= 20 && unlockAchievement('eagle-eye')) newlyUnlocked.push('eagle-eye');
    if (score >= 25 && unlockAchievement('sharp-eyes')) newlyUnlocked.push('sharp-eyes');
  }
  if (testId === 'sequence-memory') {
    if (score >= 10 && unlockAchievement('pattern-pro')) newlyUnlocked.push('pattern-pro');
  }
  if (testId === 'visual-memory') {
    if (score >= 10 && unlockAchievement('visual-genius')) newlyUnlocked.push('visual-genius');
  }
  if (testId === 'spatial-reasoning') {
    if (score >= 15 && unlockAchievement('architect')) newlyUnlocked.push('architect');
  }
  if (testId === 'chimp-test') {
    if (score >= 12 && unlockAchievement('silverback')) newlyUnlocked.push('silverback');
  }

  return newlyUnlocked;
}

// ─── Daily Challenge ────────────────────────────────────────

export function getDailyChallenge(): { testId: string; seed: number } {
  const today = getToday();
  // Simple hash of date string to get consistent daily test
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash) + today.charCodeAt(i);
    hash |= 0;
  }
  const testIds = ['reaction-time', 'typing-speed', 'number-memory', 'visual-memory', 'color-perception', 'sequence-memory', 'ai-detect', 'spatial-reasoning', 'chimp-test'];
  const index = Math.abs(hash) % testIds.length;
  return { testId: testIds[index], seed: Math.abs(hash) };
}

export function hasCompletedDailyChallenge(): boolean {
  if (typeof window === 'undefined') return false;
  const today = getToday();
  return localStorage.getItem(`vigilfi_daily_${today}`) === 'done';
}

export function markDailyChallengeComplete(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`vigilfi_daily_${getToday()}`, 'done');
}
