import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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

const CONNECTOR_VIEWBOX = { width: 1200, height: 612 };
const CONNECTOR_TARGET_OFFSETS = [-0.25, -0.075, 0.1, 0.275];

function createConnectorPath(start, end, direction) {
  const distance = Math.abs(end.x - start.x);
  const controlDistance = Math.max(48, distance * 0.36);
  const firstControlX = direction === 'input'
    ? start.x + controlDistance
    : start.x - controlDistance;
  const secondControlX = direction === 'input'
    ? end.x - controlDistance
    : end.x + controlDistance;

  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${firstControlX.toFixed(2)} ${start.y.toFixed(2)},`,
    `${secondControlX.toFixed(2)} ${end.y.toFixed(2)},`,
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(' ');
}

function measureConnectorPaths(network) {
  const networkRect = network.getBoundingClientRect();
  const inputCards = [...network.querySelectorAll('.growth-engine-cards-input .growth-engine-card')];
  const outcomeCards = [...network.querySelectorAll('.growth-engine-cards-outcome .growth-engine-card')];
  const sphere = network.querySelector('.growth-engine-sphere');

  if (!networkRect.width || !networkRect.height || inputCards.length !== 4 || outcomeCards.length !== 4 || !sphere) {
    return [];
  }

  const toViewBoxPoint = (x, y) => ({
    x: (x / networkRect.width) * CONNECTOR_VIEWBOX.width,
    y: (y / networkRect.height) * CONNECTOR_VIEWBOX.height,
  });
  const getCenterY = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top + rect.height / 2 - networkRect.top;
  };
  const sphereRect = sphere.getBoundingClientRect();
  const sphereLeft = sphereRect.left - networkRect.left;
  const sphereRight = sphereRect.right - networkRect.left;
  const sphereCenterY = sphereRect.top + sphereRect.height / 2 - networkRect.top;
  const targetYs = CONNECTOR_TARGET_OFFSETS.map((offset) => sphereCenterY + sphereRect.height * offset);

  const inputPaths = inputCards.map((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const start = toViewBoxPoint(cardRect.right - networkRect.left + 2, getCenterY(card));
    const end = toViewBoxPoint(sphereLeft + 2, targetYs[index]);

    return {
      id: `input-${index}`,
      d: createConnectorPath(start, end, 'input'),
      color: 'input',
      start,
    };
  });

  const outcomePaths = outcomeCards.map((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const start = toViewBoxPoint(cardRect.left - networkRect.left - 2, getCenterY(card));
    const end = toViewBoxPoint(sphereRight - 2, targetYs[index]);

    return {
      id: `outcome-${index}`,
      d: createConnectorPath(start, end, 'outcome'),
      color: 'outcome',
      start,
    };
  });

  return [...inputPaths, ...outcomePaths];
}

function Connectors({ animate, networkRef, isVisible }) {
  const [paths, setPaths] = useState([]);

  useLayoutEffect(() => {
    const network = networkRef.current;
    if (!network) return undefined;

    let frameId;
    let settleId;
    const measure = () => {
      setPaths(measureConnectorPaths(network));
    };
    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measure);
    };

    measure();
    settleId = window.setTimeout(measure, isVisible ? 720 : 0);

    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(scheduleMeasure);
      observer.observe(network);
      network.querySelectorAll('.growth-engine-card, .growth-engine-sphere').forEach((element) => observer.observe(element));

      return () => {
        observer.disconnect();
        window.cancelAnimationFrame(frameId);
        window.clearTimeout(settleId);
      };
    }

    window.addEventListener('resize', scheduleMeasure);
    return () => {
      window.removeEventListener('resize', scheduleMeasure);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settleId);
    };
  }, [isVisible, networkRef]);

  return (
    <svg
      className="growth-engine-connectors"
      viewBox={`0 0 ${CONNECTOR_VIEWBOX.width} ${CONNECTOR_VIEWBOX.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map(({ id, d, color, start }, index) => (
        <g className={`growth-engine-connector growth-engine-connector-${color}`} key={id}>
          <path d={d} pathLength="1" />
          {animate ? (
            <circle r="3">
              <animateMotion
                dur={`${3.6 + (index % 3) * 0.55}s`}
                begin={`${index * 0.24}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          ) : (
            <circle cx={start.x} cy={start.y} r="3" />
          )}
        </g>
      ))}
    </svg>
  );
}

function GrowthSphere({ animate }) {
  const firstWave = 'M -30 218 C 42 152, 68 265, 137 203 S 239 142, 300 203 S 370 259, 430 185';
  const secondWave = 'M -30 187 C 42 258, 81 140, 143 202 S 237 265, 302 196 S 370 144, 430 225';
  const analysisWave = 'M -30 207 C 34 181, 74 232, 137 205 S 237 176, 301 205 S 370 231, 430 198';
  const analysisWaveShift = 'M -30 202 C 34 227, 77 178, 140 201 S 238 232, 302 199 S 370 179, 430 208';

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
              className="growth-engine-energy-trace-glow"
              d={analysisWave}
              fill="none"
              stroke="#d9f5ff"
              strokeLinecap="round"
              strokeWidth="7"
            >
              {animate && <animate attributeName="d" dur="5.2s" repeatCount="indefinite" values={`${analysisWave};${analysisWaveShift};${analysisWave}`} />}
            </path>
            <path
              className="growth-engine-energy-trace"
              d={analysisWave}
              fill="none"
              stroke="#f5fcff"
              strokeLinecap="round"
              strokeWidth="1.8"
              strokeDasharray="1 8"
            >
              {animate && <animate attributeName="d" dur="5.2s" repeatCount="indefinite" values={`${analysisWave};${analysisWaveShift};${analysisWave}`} />}
            </path>
            <circle className="growth-engine-energy-trace-point" r="3.5" fill="#f5fcff">
              {animate && (
                <animateMotion dur="4.6s" repeatCount="indefinite" path={analysisWave} />
              )}
            </circle>
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
  const networkRef = useRef(null);
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

        <div ref={networkRef} className="growth-engine-network">
          <Connectors animate={!reducedMotion} networkRef={networkRef} isVisible={isVisible} />
          <SignalCards items={inputs} side="input" />
          <GrowthSphere animate={!reducedMotion} />
          <SignalCards items={outcomes} side="outcome" />
        </div>

        <p className="growth-engine-caption">One strategy. Every signal working together.</p>
      </div>
    </section>
  );
}
