import { useEffect, useRef, useState } from 'react';

const inputs = [
  { title: 'Ideal customer', detail: 'Who is ready to choose you?' },
  { title: 'Brand voice', detail: 'A story people remember.' },
  { title: 'Positioning', detail: 'A reason to stand apart.' },
  { title: 'Your website', detail: 'Built to turn visits into action.' },
];

const outcomes = [
  { title: 'Search & AI demand', detail: 'Be there when intent appears.' },
  { title: 'Competitor moves', detail: 'See the space more clearly.' },
  { title: 'Ad performance', detail: 'Put spend behind what works.' },
  { title: 'What converts', detail: 'Make every next step count.' },
];

function SignalCards({ items, side }) {
  return (
    <div className={`growth-engine-cards growth-engine-cards-${side}`}>
      {items.map((item, index) => (
        <article className="growth-engine-card" key={item.title} style={{ '--card-index': index }}>
          <span className="growth-engine-card-marker" aria-hidden="true" />
          <div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Connectors({ animate }) {
  const paths = [
    { id: 'input-one', d: 'M 275 78 C 360 78, 380 205, 451 224', color: 'input' },
    { id: 'input-two', d: 'M 275 230 C 356 230, 380 265, 451 282', color: 'input' },
    { id: 'input-three', d: 'M 275 382 C 356 382, 380 349, 451 338', color: 'input' },
    { id: 'input-four', d: 'M 275 534 C 360 534, 380 407, 451 396', color: 'input' },
    { id: 'outcome-one', d: 'M 925 78 C 840 78, 820 205, 749 224', color: 'outcome' },
    { id: 'outcome-two', d: 'M 925 230 C 844 230, 820 265, 749 282', color: 'outcome' },
    { id: 'outcome-three', d: 'M 925 382 C 844 382, 820 349, 749 338', color: 'outcome' },
    { id: 'outcome-four', d: 'M 925 534 C 840 534, 820 407, 749 396', color: 'outcome' },
  ];

  return (
    <svg className="growth-engine-connectors" viewBox="0 0 1200 612" preserveAspectRatio="none" aria-hidden="true">
      {paths.map(({ id, d, color }, index) => (
        <g className={`growth-engine-connector growth-engine-connector-${color}`} key={id}>
          <path d={d} pathLength="1" />
          <circle r="3">
            {animate && (
              <animateMotion
                dur={`${3.6 + (index % 3) * 0.55}s`}
                begin={`${index * 0.24}s`}
                repeatCount="indefinite"
                path={d}
              />
            )}
          </circle>
        </g>
      ))}
    </svg>
  );
}

function GrowthSphere({ animate }) {
  const firstWave = 'M -30 218 C 42 152, 68 265, 137 203 S 239 142, 300 203 S 370 259, 430 185';
  const secondWave = 'M -30 187 C 42 258, 81 140, 143 202 S 237 265, 302 196 S 370 144, 430 225';

  return (
    <div className="growth-engine-sphere-wrap" aria-label="An animated visualization of business growth">
      <div className="growth-engine-orbit growth-engine-orbit-one" />
      <div className="growth-engine-orbit growth-engine-orbit-two" />
      <div className="growth-engine-sphere">
        <div className="growth-engine-sphere-highlight" />
        <svg className="growth-engine-energy" viewBox="0 0 400 400" aria-hidden="true">
          <defs>
            <clipPath id="growth-sphere-clip">
              <circle cx="200" cy="200" r="188" />
            </clipPath>
            <linearGradient id="growth-energy-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#52e3e3">{animate && <animate attributeName="stop-color" values="#52e3e3;#6784ff;#52e3e3" dur="8s" repeatCount="indefinite" />}</stop>
              <stop offset="27%" stopColor="#587dff">{animate && <animate attributeName="stop-color" values="#587dff;#b84dff;#587dff" dur="8s" repeatCount="indefinite" />}</stop>
              <stop offset="52%" stopColor="#cf54ed">{animate && <animate attributeName="stop-color" values="#cf54ed;#ff547f;#cf54ed" dur="8s" repeatCount="indefinite" />}</stop>
              <stop offset="76%" stopColor="#ff6585">{animate && <animate attributeName="stop-color" values="#ff6585;#ffd166;#ff6585" dur="8s" repeatCount="indefinite" />}</stop>
              <stop offset="100%" stopColor="#ffd166">{animate && <animate attributeName="stop-color" values="#ffd166;#52e3e3;#ffd166" dur="8s" repeatCount="indefinite" />}</stop>
            </linearGradient>
            <filter id="growth-energy-glow" x="-60%" y="-150%" width="220%" height="400%">
              <feGaussianBlur stdDeviation="13" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="growth-sphere-shade" cx="34%" cy="24%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".12" />
              <stop offset="42%" stopColor="#34405c" stopOpacity=".07" />
              <stop offset="100%" stopColor="#06070e" stopOpacity=".88" />
            </radialGradient>
          </defs>
          <g clipPath="url(#growth-sphere-clip)">
            <rect width="400" height="400" fill="url(#growth-sphere-shade)" />
            <path
              className="growth-engine-energy-halo"
              d="M -30 218 C 42 152, 68 265, 137 203 S 239 142, 300 203 S 370 259, 430 185"
              fill="none"
              stroke="url(#growth-energy-gradient)"
              strokeWidth="62"
              strokeLinecap="round"
              filter="url(#growth-energy-glow)"
            >
              {animate && <animate attributeName="d" dur="7s" repeatCount="indefinite" values={`${firstWave};${secondWave};${firstWave}`} />}
            </path>
            <path
              className="growth-engine-energy-core"
              d="M -30 218 C 42 152, 68 265, 137 203 S 239 142, 300 203 S 370 259, 430 185"
              fill="none"
              stroke="url(#growth-energy-gradient)"
              strokeWidth="25"
              strokeLinecap="round"
            >
              {animate && <animate attributeName="d" dur="7s" repeatCount="indefinite" values={`${firstWave};${secondWave};${firstWave}`} />}
            </path>
            <path
              d="M 28 292 C 96 266, 151 316, 205 285 S 302 263, 372 302"
              fill="none"
              stroke="#bce9ff"
              strokeOpacity=".25"
              strokeWidth="2"
            />
          </g>
        </svg>
        <div className="growth-engine-sphere-glass" />
      </div>
      <span className="growth-engine-particle growth-engine-particle-one" />
      <span className="growth-engine-particle growth-engine-particle-two" />
      <span className="growth-engine-particle growth-engine-particle-three" />
      <span className="growth-engine-particle growth-engine-particle-four" />
    </div>
  );
}

export default function GrowthEngine() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`growth-engine${isVisible ? ' is-visible' : ''}`}
      aria-labelledby="growth-engine-title"
    >
      <div className="growth-engine-ambient growth-engine-ambient-one" aria-hidden="true" />
      <div className="growth-engine-ambient growth-engine-ambient-two" aria-hidden="true" />
      <div className="container growth-engine-container">
        <header className="growth-engine-heading">
          <span className="growth-engine-eyebrow">A connected growth system</span>
          <h2 id="growth-engine-title">
            Your business in, <span>growth out.</span>
          </h2>
          <p>
            We connect what makes your business unique to the signals that move customers —
            turning insight into focused, measurable growth.
          </p>
        </header>

        <div className="growth-engine-network">
          <Connectors animate={!reducedMotion} />
          <SignalCards items={inputs} side="input" />
          <GrowthSphere animate={!reducedMotion} />
          <SignalCards items={outcomes} side="outcome" />
        </div>

        <p className="growth-engine-caption">One strategy. Every signal working together.</p>
      </div>
    </section>
  );
}
