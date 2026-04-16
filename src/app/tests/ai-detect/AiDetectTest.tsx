'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';
import { TESTS } from '@/lib/tests';
import { playClick, playSuccess, playError } from '@/lib/sounds';
import styles from './AiDetect.module.css';

const TEST = TESTS.find(t => t.id === 'ai-detect')!;
type GameState = 'idle' | 'playing' | 'feedback' | 'done';

interface TextSample {
  text: string;
  isAI: boolean;
  topic: string;
}

// Curated pairs — each has a human-written and AI-generated version
const SAMPLES: TextSample[] = [
  { text: "The sunset painted the sky in shades of amber and crimson, casting long shadows across the quiet meadow. A faint breeze carried the scent of wildflowers, and somewhere in the distance, a bird sang its evening song.", isAI: true, topic: "Nature" },
  { text: "I watched the sun go down from the porch last night. It was one of those where the clouds catch fire and you just sit there like an idiot with your mouth open. The dog didn't care. She was chasing something in the bushes.", isAI: false, topic: "Nature" },
  { text: "The restaurant exceeded our expectations in every way. From the moment we walked in, the ambiance was perfect — dim lighting, soft jazz, and attentive staff. The truffle risotto was creamy perfection, and the wine pairing elevated each course beautifully.", isAI: true, topic: "Food" },
  { text: "Honestly the pasta was mid but their bread is insane. Like I went back twice just for the bread. The waiter seemed stressed but honestly I get it, the place was packed on a Tuesday for some reason.", isAI: false, topic: "Food" },
  { text: "Learning to play guitar requires patience, dedication, and consistent practice. Start with basic chords like G, C, and D, then gradually work your way up to more complex progressions. Within a few months, you'll be playing your favorite songs.", isAI: true, topic: "Music" },
  { text: "My fingers are shredded. Been trying to learn Wonderwall for three weeks and I swear the F chord was invented by someone who hates hands. But yesterday I got through the whole thing without stopping and my roommate actually clapped??", isAI: false, topic: "Music" },
  { text: "Remote work has fundamentally transformed the modern workplace, offering unprecedented flexibility while also presenting unique challenges. Establishing a dedicated workspace, maintaining regular hours, and leveraging digital collaboration tools are essential strategies for remote productivity.", isAI: true, topic: "Work" },
  { text: "Working from home sounded amazing until I realized I haven't worn real pants in four days. My \"commute\" is 12 steps. The fridge is right there. Help.", isAI: false, topic: "Work" },
  { text: "The city's architecture tells a story spanning centuries, from the Gothic cathedrals of the medieval quarter to the sleek glass towers of the financial district. Each neighborhood has its own unique character, inviting visitors to explore its hidden gems and storied past.", isAI: true, topic: "Travel" },
  { text: "Got lost trying to find some famous church and ended up in this tiny alley with the best gelato I've ever had. The guy spoke zero English and I speak zero Italian but we figured it out through hand gestures and mutual love of pistachio flavor.", isAI: false, topic: "Travel" },
  { text: "Exercise has been shown to have numerous benefits for both physical and mental health. Regular cardiovascular activity strengthens the heart, improves circulation, and releases endorphins that combat stress and anxiety. Experts recommend at least 150 minutes of moderate exercise per week.", isAI: true, topic: "Health" },
  { text: "Started running last month and honestly day one I thought I was dying. Like actual death. But now I can do 2 miles without wanting to collapse and it's weirdly the best part of my day. My knees disagree but whatever.", isAI: false, topic: "Health" },
  { text: "The film masterfully weaves together themes of identity and belonging, creating a narrative that resonates on both an emotional and intellectual level. The cinematography is breathtaking, with each frame carefully composed to enhance the storytelling experience.", isAI: true, topic: "Film" },
  { text: "watched it at 2am expecting nothing and ended up ugly crying into a pillow. the dog scene??? UNNECESSARY. my friend said it was \"mid\" and we haven't spoken since. 10/10 would ruin my sleep schedule again.", isAI: false, topic: "Film" },
  { text: "Effective time management is the cornerstone of personal and professional success. By prioritizing tasks, eliminating distractions, and utilizing proven frameworks such as the Pomodoro Technique, individuals can significantly enhance their productivity and achieve their goals.", isAI: true, topic: "Productivity" },
  { text: "I made a to-do list and immediately lost it. Found it three days later under a coffee mug. Half the stuff was done but I have no memory of doing it. That's either efficiency or a serious problem.", isAI: false, topic: "Productivity" },
  { text: "The advancement of artificial intelligence represents one of the most transformative technological developments of our era. From natural language processing to computer vision, AI systems are increasingly capable of performing tasks that were once thought to be exclusively human.", isAI: true, topic: "Technology" },
  { text: "asked chatgpt to write my birthday card and my mom loved it more than anything I've ever written. do I feel betrayed by my own brain? yes. will I do it again? absolutely.", isAI: false, topic: "Technology" },
  { text: "Gardening offers a profound connection to nature and provides immense satisfaction as one witnesses the transformation of seeds into thriving plants. Whether cultivating vegetables, herbs, or ornamental flowers, the practice promotes mindfulness, physical activity, and a deeper appreciation for the natural world.", isAI: true, topic: "Gardening" },
  { text: "killed another succulent. how. it literally needs water once a month and sunlight. I gave it both. it looked at me and chose death. meanwhile the weed growing through the sidewalk crack is thriving. make it make sense.", isAI: false, topic: "Gardening" },
];

const ROUNDS = 10;

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function AiDetectTest() {
  const [state, setState] = useState<GameState>('idle');
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [samples, setSamples] = useState<TextSample[]>([]);
  const [lastAnswer, setLastAnswer] = useState<'correct' | 'wrong' | null>(null);

  const startGame = useCallback(() => {
    playClick();
    setSamples(shuffleArray(SAMPLES).slice(0, ROUNDS));
    setRound(0);
    setCorrect(0);
    setState('playing');
    setLastAnswer(null);
  }, []);

  const handleGuess = useCallback((guessedAI: boolean) => {
    const sample = samples[round];
    const isCorrect = guessedAI === sample.isAI;

    if (isCorrect) {
      setCorrect(prev => prev + 1);
      playSuccess();
    } else {
      playError();
    }
    setLastAnswer(isCorrect ? 'correct' : 'wrong');
    setState('feedback');
  }, [round, samples]);

  const nextRound = useCallback(() => {
    setLastAnswer(null);
    if (round + 1 >= ROUNDS) {
      setState('done');
    } else {
      setRound(prev => prev + 1);
      setState('playing');
    }
  }, [round]);

  const reset = useCallback(() => {
    setState('idle');
    setRound(0);
    setCorrect(0);
    setSamples([]);
    setLastAnswer(null);
  }, []);

  const score = Math.round((correct / ROUNDS) * 100);
  const currentSample = samples[round];

  if (state === 'done') {
    return (
      <main className={styles.container}>
        <div className={styles.resultPage}>
          <ResultCard test={TEST} score={score} subtitle={`${correct}/${ROUNDS} correct`} />
          <div className={styles.resultActions}>
            <button className={styles.retryBtn} onClick={reset}>
              <RotateCcw size={18} /> Try Again
            </button>
            <Link href="/" className={styles.backBtn}>
              <ArrowLeft size={18} /> All Tests
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {state === 'idle' ? (
        <div className={styles.gameArea} onClick={startGame}>
          <div className={styles.content}>
            <div className={styles.icon}>🤖</div>
            <h1 className={styles.title}>AI or Human?</h1>
            <p className={styles.subtitle}>
              Read a text snippet and guess whether it was written by AI or a real human.
              Can your brain outsmart the machine?
            </p>
            <p className={styles.cta}>Click anywhere to start</p>
          </div>
        </div>
      ) : (
        <div className={styles.playArea}>
          <div className={styles.topBar}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${((round + (state === 'feedback' ? 1 : 0)) / ROUNDS) * 100}%` }} />
            </div>
            <div className={styles.topMeta}>
              <span className={styles.roundBadge}>
                {round + 1}/{ROUNDS}
              </span>
              <span className={styles.scoreLive}>
                {correct} correct
              </span>
            </div>
          </div>

          {currentSample && (
            <div className={styles.sampleCard}>
              <div className={styles.topicBadge}>{currentSample.topic}</div>
              <blockquote className={styles.sampleText}>
                &ldquo;{currentSample.text}&rdquo;
              </blockquote>

              {state === 'playing' && (
                <div className={styles.buttonRow}>
                  <button
                    className={`${styles.guessBtn} ${styles.humanBtn}`}
                    onClick={() => handleGuess(false)}
                  >
                    ✍️ Human
                  </button>
                  <button
                    className={`${styles.guessBtn} ${styles.aiBtn}`}
                    onClick={() => handleGuess(true)}
                  >
                    🤖 AI Generated
                  </button>
                </div>
              )}

              {state === 'feedback' && (
                <div className={styles.feedbackSection}>
                  <div className={`${styles.feedbackBanner} ${lastAnswer === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                    {lastAnswer === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
                    <span className={styles.feedbackDetail}>
                      This was written by <strong>{currentSample.isAI ? 'AI' : 'a human'}</strong>
                    </span>
                  </div>
                  <button className={styles.nextBtn} onClick={nextRound}>
                    {round + 1 >= ROUNDS ? 'See Results' : 'Next →'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>About This Test</h3>
            <p>
              Can you tell the difference between AI-generated text and genuine
              human writing? This test challenges your ability to detect the
              patterns, quirks, and imperfections that distinguish human
              communication from machine output.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Average Scores</h3>
            <ul>
              <li><strong>90%+</strong> — AI Detection Expert</li>
              <li><strong>70-89%</strong> — Sharp Reader</li>
              <li><strong>50-69%</strong> — Average (coin flip territory)</li>
              <li><strong>&lt; 50%</strong> — The machines have won 😅</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Tips to Detect AI</h3>
            <p>
              AI text tends to be polished, generic, and emotionally flat.
              Human text has typos, personality, humor, specific anecdotes,
              and irregular rhythm. Look for imperfection — that&apos;s the human
              fingerprint.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
