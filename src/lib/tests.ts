// Test definitions and configuration
export interface TestInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  colorGlow: string;
  category: 'speed' | 'memory' | 'perception' | 'accuracy' | 'composite';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  unit: string;
  higherIsBetter: boolean;
}

export const TESTS: TestInfo[] = [
  {
    id: 'reaction-time',
    name: 'Reaction Time',
    slug: 'reaction-time',
    description: 'Test how quickly you can respond to a visual stimulus. When the screen turns green, click as fast as you can.',
    shortDescription: 'How fast can you react?',
    icon: '⚡',
    color: '#00cec9',
    colorGlow: 'rgba(0, 206, 201, 0.3)',
    category: 'speed',
    difficulty: 'Easy',
    duration: '30 sec',
    unit: 'ms',
    higherIsBetter: false,
  },
  {
    id: 'typing-speed',
    name: 'Typing Speed',
    slug: 'typing-speed',
    description: 'See how fast and accurately you can type. Your words per minute and accuracy will be measured.',
    shortDescription: 'How fast can you type?',
    icon: '⌨️',
    color: '#6c5ce7',
    colorGlow: 'rgba(108, 92, 231, 0.3)',
    category: 'speed',
    difficulty: 'Medium',
    duration: '60 sec',
    unit: 'WPM',
    higherIsBetter: true,
  },
  {
    id: 'number-memory',
    name: 'Number Memory',
    slug: 'number-memory',
    description: 'Remember increasingly long numbers. Each level adds another digit. How far can you go?',
    shortDescription: 'How many digits can you remember?',
    icon: '🔢',
    color: '#f39c12',
    colorGlow: 'rgba(243, 156, 18, 0.3)',
    category: 'memory',
    difficulty: 'Medium',
    duration: '2-5 min',
    unit: 'digits',
    higherIsBetter: true,
  },
  {
    id: 'visual-memory',
    name: 'Visual Memory',
    slug: 'visual-memory',
    description: 'Memorize the pattern of highlighted tiles on a grid, then reproduce it. The grid grows larger each level.',
    shortDescription: 'How well do your eyes remember?',
    icon: '👁️',
    color: '#00b894',
    colorGlow: 'rgba(0, 184, 148, 0.3)',
    category: 'memory',
    difficulty: 'Hard',
    duration: '2-5 min',
    unit: 'level',
    higherIsBetter: true,
  },
  {
    id: 'color-perception',
    name: 'Color Perception',
    slug: 'color-perception',
    description: 'Find the tile with a slightly different color. Each level makes the difference more subtle. Only 2% reach level 30.',
    shortDescription: 'Can your eyes spot the difference?',
    icon: '🎨',
    color: '#fd79a8',
    colorGlow: 'rgba(253, 121, 168, 0.3)',
    category: 'perception',
    difficulty: 'Hard',
    duration: '2-5 min',
    unit: 'level',
    higherIsBetter: true,
  },
  {
    id: 'sequence-memory',
    name: 'Sequence Memory',
    slug: 'sequence-memory',
    description: 'Watch the sequence of tiles that light up, then repeat the pattern. The sequence grows each round.',
    shortDescription: 'Can you remember the sequence?',
    icon: '🧩',
    color: '#e17055',
    colorGlow: 'rgba(225, 112, 85, 0.3)',
    category: 'memory',
    difficulty: 'Medium',
    duration: '2-5 min',
    unit: 'level',
    higherIsBetter: true,
  },
  {
    id: 'ai-detect',
    name: 'AI or Human?',
    slug: 'ai-detect',
    description: 'Read text snippets and guess whether they were written by AI or a real human. Test your ability to spot machine-generated content.',
    shortDescription: 'Can you outsmart the AI?',
    icon: '🤖',
    color: '#74b9ff',
    colorGlow: 'rgba(116, 185, 255, 0.3)',
    category: 'perception',
    difficulty: 'Medium',
    duration: '2-3 min',
    unit: '%',
    higherIsBetter: true,
  },
  {
    id: 'spatial-reasoning',
    name: 'Spatial Reasoning',
    slug: 'spatial-reasoning',
    description: 'Test your spatial intelligence and mental flexibility. Identify the matching matrix after it has been mathematically rotated.',
    shortDescription: 'Can you mentally rotate shapes?',
    icon: '🔄',
    color: '#a29bfe',
    colorGlow: 'rgba(162, 155, 254, 0.3)',
    category: 'composite',
    difficulty: 'Hard',
    duration: '2-5 min',
    unit: 'level',
    higherIsBetter: true,
  },
  {
    id: 'chimp-test',
    name: 'Chimp Test',
    slug: 'chimp-test',
    description: 'Are you smarter than a chimpanzee? Memorize the sequence of numbers, then click them in order after they are hidden.',
    shortDescription: 'Can you beat a chimp?',
    icon: '🐵',
    color: '#00b894',
    colorGlow: 'rgba(0, 184, 148, 0.3)',
    category: 'memory',
    difficulty: 'Hard',
    duration: '2-5 min',
    unit: 'level',
    higherIsBetter: true,
  },
];

export const CATEGORIES = {
  speed: { name: 'Speed', icon: '⚡', color: '#00cec9' },
  memory: { name: 'Memory', icon: '🧠', color: '#f39c12' },
  perception: { name: 'Perception', icon: '👁️', color: '#fd79a8' },
  accuracy: { name: 'Accuracy', icon: '🎯', color: '#00b894' },
  composite: { name: 'Composite', icon: '🏆', color: '#6c5ce7' },
};

// Percentile data (approximate baselines)
export function getPercentile(testId: string, score: number): number {
  const baselines: Record<string, { median: number; stddev: number; higherIsBetter: boolean }> = {
    'reaction-time': { median: 273, stddev: 60, higherIsBetter: false },
    'typing-speed': { median: 42, stddev: 15, higherIsBetter: true },
    'number-memory': { median: 7, stddev: 2, higherIsBetter: true },
    'visual-memory': { median: 8, stddev: 3, higherIsBetter: true },
    'color-perception': { median: 18, stddev: 6, higherIsBetter: true },
    'sequence-memory': { median: 8, stddev: 3, higherIsBetter: true },
    'ai-detect': { median: 65, stddev: 15, higherIsBetter: true },
    'spatial-reasoning': { median: 8, stddev: 3, higherIsBetter: true },
    'chimp-test': { median: 8, stddev: 3, higherIsBetter: true },
  };

  const b = baselines[testId];
  if (!b) return 50;

  // Z-score calculation
  let z = (score - b.median) / b.stddev;
  if (!b.higherIsBetter) z = -z;

  // Convert z-score to percentile (approximate CDF)
  const percentile = 50 * (1 + erf(z / Math.sqrt(2)));
  return Math.max(1, Math.min(99, Math.round(percentile)));
}

// Error function approximation (Abramowitz & Stegun)
function erf(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function getPercentileLabel(percentile: number): string {
  if (percentile >= 95) return 'Exceptional';
  if (percentile >= 85) return 'Excellent';
  if (percentile >= 70) return 'Above Average';
  if (percentile >= 40) return 'Average';
  if (percentile >= 20) return 'Below Average';
  return 'Needs Practice';
}

export function getPercentileColor(percentile: number): string {
  if (percentile >= 90) return '#00b894';
  if (percentile >= 70) return '#00cec9';
  if (percentile >= 50) return '#6c5ce7';
  if (percentile >= 30) return '#f39c12';
  return '#e74c3c';
}
