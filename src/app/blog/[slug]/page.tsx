import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import styles from './article.module.css';

// Blog article content database
const ARTICLES: Record<string, {
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  'how-to-improve-reaction-time': {
    title: 'How to Improve Your Reaction Time: 7 Proven Methods',
    description: 'Reaction time is a trainable skill. Learn science-backed methods to shave milliseconds off your response time.',
    date: '2026-04-10',
    readTime: '5 min read',
    content: `
## What Is Reaction Time?

Reaction time is the interval between a stimulus and your response. The average human visual reaction time is approximately **273 milliseconds** — about a quarter of a second. But with practice, you can significantly reduce this.

Professional gamers average **150-200ms**. Formula 1 drivers clock in at **100-150ms**. These aren't genetic gifts — they're trained skills.

## 7 Proven Methods to Improve Your Reaction Time

### 1. Practice With Purpose (Not Just Repetition)

Random clicking won't help. Use structured reaction time tests (like the one on VIGILFI) and track your progress over time. Aim for 3-5 sessions per week, each lasting 5-10 minutes. Research shows deliberate practice produces the fastest improvement.

### 2. Optimize Your Sleep

Sleep deprivation is the **number one killer of reaction time**. A study published in the journal *Sleep* found that getting only 6 hours of sleep for two weeks produced the same cognitive impairment as staying awake for 48 hours straight.

**Target:** 7-9 hours of quality sleep per night.

### 3. Strategic Caffeine Use

Caffeine improves reaction time by 5-10% in most studies. The optimal dose is **100-200mg** (roughly 1-2 cups of coffee), consumed 30-60 minutes before testing. Higher doses can cause jitters that actually worsen performance.

### 4. Exercise Regularly

Aerobic exercise increases blood flow to the brain and promotes neuroplasticity. A 2019 meta-analysis found that regular exercise improved reaction time by an average of **12%**. Even a 20-minute walk before testing can help.

### 5. Stay Hydrated

Dehydration of just 2% body weight can impair cognitive performance, including reaction time. Keep water nearby during testing sessions.

### 6. Reduce Screen Brightness Fatigue

If you're testing on a screen, ensure your brightness is comfortable and your room lighting doesn't cause glare. Eye fatigue significantly impacts reaction time over multiple rounds.

### 7. Warm Up Before Testing

Your first few attempts are always worse. Do 3-5 warm-up rounds before counting your "real" score. Your brain and eye-hand coordination need a brief activation period.

## What Affects Reaction Time?

Several factors influence your baseline reaction time:
- **Age:** Reaction time peaks in your mid-20s and gradually slows
- **Fatigue:** Tired = slower. Always.
- **Distractions:** Multitasking fragments attention
- **Input device:** Mouse vs. touchscreen vs. keyboard all differ
- **Monitor refresh rate:** 144Hz displays can show stimuli faster than 60Hz

## Ready to Test Yourself?

Track your progress with our free Reaction Time Test. It measures your average across 5 rounds for a reliable score.
    `,
  },
  'average-typing-speed-by-age': {
    title: 'Average Typing Speed by Age: What the Data Shows',
    description: 'How fast should you type? Average WPM by age group, profession, and experience level.',
    date: '2026-04-08',
    readTime: '4 min read',
    content: `
## Average Typing Speeds

The average typing speed for adults is approximately **42 words per minute (WPM)**. But this varies significantly by age, profession, and how much you use a keyboard daily.

## Typing Speed by Age Group

| Age Group | Average WPM | Notes |
|-----------|------------|-------|
| 8-12 years | 15-25 WPM | Still developing motor skills |
| 13-17 years | 30-45 WPM | Digital natives, improving rapidly |
| 18-25 years | 40-55 WPM | Peak learning period |
| 26-40 years | 40-60 WPM | Stabilized, varies by profession |
| 41-60 years | 35-50 WPM | Slight decline if not practicing |
| 60+ years | 25-40 WPM | Motor speed decreases naturally |

## Typing Speed by Profession

| Profession | Average WPM |
|-----------|------------|
| Professional typist | 65-95 WPM |
| Programmer | 50-70 WPM |
| Writer/Journalist | 55-75 WPM |
| General office worker | 40-55 WPM |
| Data entry specialist | 60-90 WPM |

## How to Improve Your Typing Speed

1. **Learn proper finger placement** — Home row technique is the foundation
2. **Practice daily** — Even 10 minutes a day produces measurable improvement in 2 weeks
3. **Focus on accuracy first** — Speed with errors is slower than accuracy at moderate speed
4. **Use typing practice tools** — Sites like our Typing Speed Test help you track progress
5. **Don't look at the keyboard** — This forces muscle memory development

## The 100 WPM Club

Typing at 100+ WPM puts you in the top 5% of all typists. The world record for typing speed is **216 WPM**, held by Stella Pajunas. Most competitive typists range from 120-180 WPM.

## Test Your Speed

Take our free Typing Speed Test to see where you stand. It measures both speed (WPM) and accuracy over a 30-second session.
    `,
  },
  'what-is-working-memory': {
    title: "What Is Working Memory? The Science Behind Short-Term Recall",
    description: "Working memory is your brain's notepad. Learn how it works and how to expand your capacity.",
    date: '2026-04-05',
    readTime: '6 min read',
    content: `
## Working Memory: Your Brain's Notepad

Working memory is the cognitive system responsible for temporarily holding and manipulating information. It's what you use when you remember a phone number long enough to dial it, or when you do mental arithmetic.

## Miller's Law: The Magic Number 7±2

In 1956, psychologist George Miller published one of the most cited papers in cognitive science: "The Magical Number Seven, Plus or Minus Two." He found that the average person can hold **7 ± 2 items** in working memory simultaneously.

This is why:
- Phone numbers are 7 digits
- Most people can remember 5-9 items on a grocery list without writing them down
- Our Number Memory test shows most people max out at 7-9 digits

## How Working Memory Works

Working memory has several components (according to Baddeley's model):

1. **Central Executive** — Controls attention and coordinates information
2. **Phonological Loop** — Processes verbal and acoustic information (the voice in your head)
3. **Visuospatial Sketchpad** — Handles visual and spatial information
4. **Episodic Buffer** — Integrates information from different sources

## Can You Improve Working Memory?

Research is mixed, but several strategies show promise:

### Chunking
Instead of remembering 8-0-0-5-5-5-1-2-3-4, remember 800-555-1234. Chunking transforms 10 individual items into 3 meaningful groups.

### Spaced Repetition
Reviewing information at increasing intervals strengthens memory traces. This is the science behind flashcard apps.

### Dual N-Back Training
Some studies suggest that dual n-back training can improve fluid intelligence and working memory capacity by 10-15%. Results are debated but promising.

### Physical Exercise
Aerobic exercise increases BDNF (brain-derived neurotrophic factor), which supports memory formation and neural growth.

## Test Your Working Memory

Try our Number Memory and Visual Memory tests to assess your working memory capacity. The Number Memory test specifically measures your digit span — a classic working memory assessment used in clinical psychology.
    `,
  },
  'brain-age-what-it-means': {
    title: "Brain Age: What It Actually Means (And What It Doesn't)",
    description: "Brain age calculators are everywhere. But what does it actually measure?",
    date: '2026-04-01',
    readTime: '5 min read',
    content: `
## What Is "Brain Age"?

Brain age is a popular concept that attempts to estimate how old your brain "acts" compared to your chronological age. Made famous by Nintendo's "Brain Age" game, the concept suggests that your cognitive performance can be younger or older than your actual age.

## What Brain Age Actually Measures

Most brain age calculators combine scores from several cognitive tests:
- **Processing speed** (reaction time)
- **Working memory** (number/visual memory)
- **Attention** (multitasking ability)
- **Perceptual speed** (color perception, pattern recognition)

These scores are compared against age-normed data to produce a composite "brain age."

## What Brain Age Doesn't Tell You

### It's Not a Medical Diagnosis
Brain age calculators are entertainment tools, not clinical assessments. A "brain age" of 45 when you're 25 does not mean you have cognitive decline. It means you scored below average on a few simple tests on that particular day.

### It's Highly Variable
Your brain age can vary by 10-15 years depending on:
- How much sleep you got
- Whether you had coffee
- Your stress level
- How familiar you are with the test format
- Your device (touchscreen vs. mouse)

### It Measures Speed, Not Intelligence
Brain age tests heavily weight processing speed. Being "slow but thorough" will give you a worse brain age than being "fast but sloppy." This doesn't reflect overall cognitive ability.

## The Science Behind Cognitive Aging

Real cognitive aging research shows:
- **Processing speed** peaks around age 18-25 and declines gradually
- **Vocabulary and knowledge** continue increasing until age 60-70
- **Working memory** peaks in the mid-20s with slow decline
- **Crystallized intelligence** (accumulated knowledge) improves throughout life

## The Bottom Line

Brain age is a fun, gamified way to engage with cognitive testing. Treat it as entertainment and motivation to stay mentally active — not as a measure of your intelligence or health.

## Test Multiple Cognitive Skills

Try all 7 tests on VIGILFI to get a well-rounded picture of your cognitive abilities, from reaction time to visual memory.
    `,
  },
  'color-perception-human-eye': {
    title: 'How Your Eyes See Color: The Science of Color Perception',
    description: 'The human eye can distinguish about 10 million colors. Learn how cone cells work and test your vision.',
    date: '2026-03-28',
    readTime: '7 min read',
    content: `
## How the Human Eye Sees Color

Color perception begins when light enters the eye and hits the retina — a thin layer of cells at the back of the eyeball. The retina contains two types of photoreceptor cells:

- **Rods** (~120 million) — Detect light intensity, work in low light, no color
- **Cones** (~6 million) — Detect color, work in bright light

## The Three Types of Cones

Humans have three types of cone cells, each sensitive to different wavelengths:

| Cone Type | Peak Sensitivity | Color Range |
|-----------|-----------------|-------------|
| S-cones (Short) | ~420nm | Blue-violet |
| M-cones (Medium) | ~530nm | Green |
| L-cones (Long) | ~560nm | Red-orange |

Your brain combines signals from all three cone types to produce the full spectrum of colors you perceive — approximately **10 million distinguishable colors**.

## Color Blindness

Color vision deficiency affects approximately **8% of men** and **0.5% of women**. The most common types:

- **Protanopia** — No L-cones (red-blind)
- **Deuteranopia** — No M-cones (green-blind)
- **Tritanopia** — No S-cones (blue-blind, very rare)
- **Anomalous trichromacy** — All three cones present but one is shifted

Most "color blind" people aren't fully blind to colors — they have reduced ability to distinguish between certain shades, particularly reds and greens.

## Factors That Affect Color Perception

### Screen Quality
Different monitors display colors differently. An IPS display shows more accurate colors than a TN panel. OLED displays have the widest color gamut.

### Brightness
Screen brightness significantly affects your ability to distinguish subtle color differences. For our Color Perception test, we recommend maximum brightness.

### Age
The lens of the eye yellows with age, which can reduce blue-violet perception starting around age 40-50.

### Lighting Conditions
Ambient lighting affects perceived colors on screen. Test in a dimly lit room for best results.

## Test Your Color Perception

Our Color Perception test challenges you to find a tile with a slightly different color from the rest. The difference becomes more subtle with each level. Most people reach level 15-20. Exceptional color perceivers can reach level 25+.

Only about 2% of test takers reach level 30 — do you have what it takes?
    `,
  },
  'chimp-capacity-and-visual-memory': {
    title: 'Why Chimpanzees Beat Humans at Working Memory Tests',
    description: 'Learn why Kyoto University proved chimpanzees possess a visual superpower that adult humans genetically lack.',
    date: '2026-04-15',
    readTime: '6 min read',
    content: `
## The Ayumu Phenomenon

In 2007, Dr. Tetsuro Matsuzawa at Kyoto University's Primate Research Institute published a paper that shattered human egos globally. It involved a young chimpanzee named Ayumu. 

Ayumu was taught the sequence of numbers 1 through 9. During testing, the numbers were laid out randomly on a touch screen. The moment Ayumu tapped '1', the remaining numbers were hidden beneath white squares. Effortlessly, at lightning speed, Ayumu tapped the remaining squares in the exact correct numeric sequence.

When adult humans attempted the exact same test, they failed spectacularly. Ayumu could perform this task successfully even when the numbers were visible for less than 210 milliseconds — literally the duration of a human eye blink.

## Why Did We Lose This Visual Superpower?

If chimpanzees are our evolutionary cousins, why is their transient visual memory so overwhelmingly superior? The prevailing theory is the **Cognitive Trade-Off Hypothesis**.

As human beings evolved, we required massive neurological real estate for advanced social communication and language processing. To develop Wernicke's and Broca's areas (the language centers of the brain), we had to surrender cognitive resources from other regions. 

We traded instantaneous eidetic-like "trace memory" for the ability to build complex grammar, abstract thought, and verbal logic. The chimpanzee brain retained the biological hardware necessary for rapid environmental mapping—a crucial survival trait in a chaotic jungle canopy where snapping branches might indicate a hidden predator.

## Can Humans Train Trace Memory?

While our baseline neurology differs, the human brain still retains immense *neuroplasticity*. By isolating the visual cortex and drilling sequence-based spatial mapping, humans can compress their working memory retention rates.

- **Chunking Sub-Grids:** Elite players of the Chimp Test do not memorize "5, then 8, then 2". They categorize the screen into distinct geometric shapes and trace an invisible path connecting the nodes.
- **Peripheral Expansion:** Instead of focusing on individual tiles, looking at the dead-center of the screen allows you to "soft focus" capture the entire grid in your periphery.

## Find Out Where You Stand

Are you operating at average human capacity, or do you possess anomalous trace memory? Boot up the exact replica of the Kyoto University parameter test inside the VIGILFI platform. 

Try the **Chimp Memory Test** and see if you can achieve the "Silverback" ranking.
    `,
  },
  'spatial-reasoning-and-stem-aptitude': {
    title: 'Spatial Reasoning: The Hidden Predictor of Top STEM Performers',
    description: 'Mental rotation and spatial IQ are among the strongest predictors of success in modern engineering and architecture.',
    date: '2026-04-12',
    readTime: '7 min read',
    content: `
## What is Spatial Reasoning?

Spatial reasoning (or visuospatial intelligence) is the cognitive capacity to understand, remember, and mathematically manipulate the 3-dimensional relations among objects. 

One of the most rigorous forms of measuring this capacity is **Mental Rotation** — the ability to look at a 2D representation of a complex 3D or asymmetric matrix, and accurately determine what it looks like when rotated on various axes (90°, 180°, 270°).

## The Invisible Engine of STEM

For decades, standardized intelligence tests prioritized verbal and quantitative reasoning. However, recent longitudinal studies spanning over 50 years (like the *Study of Mathematically Precocious Youth*) have isolated spatial intelligence as the definitive "hidden predictor" of extreme success in STEM.

| Profession | Reliance on Spatial Elasticity |
|-----------|-----------------|
| Mechanical Engineering | Extremely High (CAD modeling, fluid dynamics) |
| Architecture | Extremely High (Spatial volume, structural loads) |
| Surgery | High (Anatomical navigation, laparoscopy) |
| Software Architecture | High (Database structuring, abstract logic webs) |
| Law / Literature | Low |

An engineer must visualize exactly how mechanical gears lock without physically building them. A chemist must visualize the 3D structure of a protein folding. This manipulation occurs entirely within the brain's spatial sketchpad.

## Is Spatial Intelligence Fixed?

For years, psychologists believed spatial processing constraints were genetically hardcoded. We now know that **Spatial Elasticity** applies. While genetic baselines exist, the brain's spatial mapping centers can undergo hypertrophy just like a muscle.

Studies have proven that students engaging with complex video games (such as Portal or Tetris), CAD software, and physical topology puzzles can significantly increase their baseline mental rotation speed by optimizing neural pathways in the posterior parietal cortex.

## The VIGILFI Spatial Protocol

Most online tests fail to test true mental rotation because they allow "symmetrical" shapes to be generated, allowing the user to guess. The VIGILFI **Spatial Reasoning Test** is mathematically engineered to be physically impossible to solve without genuine geometric manipulation.

The engine generates entirely non-symmetrical, procedurally assembled matrices. It then violently rotates them while surrounding the target with mirrored illusions to break your working memory. It is considered one of the highest fidelity spatial IQ tests currently available in a browser environment.

Push your limits today and see if you can hit Level 15 (The Architect).
    `,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) {
    return { title: 'Article Not Found — VIGILFI' };
  }
  return {
    title: `${article.title} — VIGILFI Blog`,
    description: article.description,
  };
}

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <>
        <Navbar />
        <main className={styles.container}>
          <div className={styles.notFound}>
            <h1>Article Not Found</h1>
            <p>This article doesn&apos;t exist yet.</p>
            <Link href="/blog" className={styles.backLink}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/blog" className={styles.backLink}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className={styles.dot}>·</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          <div className={styles.body} dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} />

          <footer className={styles.footer}>
            <div className={styles.cta}>
              <h3>Ready to test yourself?</h3>
              <p>Take any of our free cognitive tests — no sign-up required.</p>
              <Link href="/#tests" className={styles.ctaBtn}>
                Browse All Tests →
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}

// Simple markdown to HTML converter for blog content
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      const isHeader = cells.some(c => c.trim().match(/^-+$/));
      if (isHeader) return '';
      const tag = 'td';
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (match) => `<table>${match}</table>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^(?!<[hultd])((?!^$).+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/\n{2,}/g, '\n');
}
