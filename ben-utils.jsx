/* BEN v2 — Utils, hooks, shared primitives */

function useInView(options = {}) {
  const ref = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsInView(true); if (!options.repeat) obs.unobserve(el); }
      else if (options.repeat) setIsInView(false);
    }, { threshold: options.threshold || 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isInView];
}

function useCounter(end, duration = 1800, active = false) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    let startTime = null, raf;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);
  return val;
}

function FadeIn({ children, delay = 0, className = '', up = true }) {
  const [ref, isInView] = useInView();
  return React.createElement('div', {
    ref, className,
    style: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'none' : up ? 'translateY(28px)' : 'none',
      transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`
    }
  }, children);
}

// Countdown to May 12, 2026 00:00 Almaty (UTC+5 = May 11 19:00 UTC)
function useCountdown() {
  const target = new Date('2026-05-12T00:00:00+05:00').getTime();
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return { d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) };
  };
  const [t, setT] = React.useState(calc);
  React.useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, []);
  return t;
}

// Live seats taken counter — persisted, slowly increments
function useLiveSeats() {
  const TOTAL = 300;
  const getStored = () => {
    try {
      const s = JSON.parse(localStorage.getItem('ben_seats') || 'null');
      if (s && s.val && s.ts && (Date.now() - s.ts) < 7200000) return s.val;
    } catch(e) {}
    return 237;
  };
  const save = (v) => { try { localStorage.setItem('ben_seats', JSON.stringify({ val: v, ts: Date.now() })); } catch(e) {} };
  const [taken, setTaken] = React.useState(getStored);

  // Increment on reservation event
  React.useEffect(() => {
    const onReserved = () => {
      setTaken(prev => {
        const next = Math.min(prev + 1, TOTAL);
        save(next);
        return next;
      });
    };
    window.addEventListener('ben:reserved', onReserved);
    return () => window.removeEventListener('ben:reserved', onReserved);
  }, []);

  // Slow background increment
  React.useEffect(() => {
    const tick = () => {
      setTaken(prev => {
        if (prev >= 297) return prev;
        const next = prev + 1;
        save(next);
        return next;
      });
    };
    const delay = 40000 + Math.random() * 50000; // 40-90s
    const t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [taken]);

  return { taken, left: TOTAL - taken, total: TOTAL, pct: (taken / TOTAL) * 100 };
}

// Section
function Section({ id, children, className = '', style = {} }) {
  return React.createElement('section', { id, className: `ben-section ${className}`, style },
    React.createElement('div', { className: 'ben-container' }, children)
  );
}

// Quote divider
function QuoteDivider({ text }) {
  return React.createElement('div', { className: 'quote-divider' },
    React.createElement('div', { className: 'ben-container' },
      React.createElement(FadeIn, { up: false },
        React.createElement('blockquote', { className: 'quote-text' }, text)
      )
    )
  );
}

// Indigo section
function IndigoSection({ id, children, className = '' }) {
  return React.createElement('section', { id, className: `ben-section indigo-section ${className}` },
    React.createElement('div', { className: 'ben-container' }, children)
  );
}

// Lazy image helper — use instead of bare <img> for below-fold images
function LazyImg({ src, alt, className, style }) {
  return React.createElement('img', { src, alt, className, style, loading: 'lazy', decoding: 'async' });
}

const Icons = {
  Clock: () => React.createElement('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('circle',{cx:12,cy:12,r:10}), React.createElement('polyline',{points:'12 6 12 12 16 14'})),
  Gift: () => React.createElement('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('polyline',{points:'20 12 20 22 4 22 4 12'}), React.createElement('rect',{x:2,y:7,width:20,height:5}), React.createElement('line',{x1:12,y1:22,x2:12,y2:7}), React.createElement('path',{d:'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z'}), React.createElement('path',{d:'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'})),
  Users: () => React.createElement('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('path',{d:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'}), React.createElement('circle',{cx:9,cy:7,r:4}), React.createElement('path',{d:'M23 21v-2a4 4 0 0 0-3-3.87'}), React.createElement('path',{d:'M16 3.13a4 4 0 0 1 0 7.75'})),
  Play: () => React.createElement('svg',{width:36,height:36,viewBox:'0 0 24 24',fill:'currentColor',stroke:'none'}, React.createElement('polygon',{points:'5 3 19 12 5 21 5 3'})),
  Check: () => React.createElement('svg',{width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2.5,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('polyline',{points:'20 6 9 17 4 12'})),
  ChevronDown: () => React.createElement('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('polyline',{points:'6 9 12 15 18 9'})),
  Shield: () => React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('path',{d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'})),
  ArrowRight: () => React.createElement('svg',{width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('line',{x1:5,y1:12,x2:19,y2:12}), React.createElement('polyline',{points:'12 5 19 12 12 19'})),
  X: () => React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('line',{x1:18,y1:6,x2:6,y2:18}), React.createElement('line',{x1:6,y1:6,x2:18,y2:18})),
  DollarSign: () => React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('line',{x1:12,y1:1,x2:12,y2:23}), React.createElement('path',{d:'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'})),
  TrendingUp: () => React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('polyline',{points:'23 6 13.5 15.5 8.5 10.5 1 18'}), React.createElement('polyline',{points:'17 6 23 6 23 12'})),
  Target: () => React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('circle',{cx:12,cy:12,r:10}), React.createElement('circle',{cx:12,cy:12,r:6}), React.createElement('circle',{cx:12,cy:12,r:2})),
  Layers: () => React.createElement('svg',{width:22,height:22,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('polygon',{points:'12 2 2 7 12 12 22 7 12 2'}), React.createElement('polyline',{points:'2 17 12 22 22 17'}), React.createElement('polyline',{points:'2 12 12 17 22 12'})),
  Star: () => React.createElement('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'currentColor'}, React.createElement('polygon',{points:'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'})),
  CheckCircle: () => React.createElement('svg',{width:48,height:48,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}, React.createElement('path',{d:'M22 11.08V12a10 10 0 1 1-5.93-9.14'}), React.createElement('polyline',{points:'22 4 12 14.01 9 11.01'})),
};

// Questionnaire modal context
const QCtx = React.createContext(null);
function useQuestionnaire() { return React.useContext(QCtx); }

Object.assign(window, { useInView, useCounter, FadeIn, useCountdown, useLiveSeats, Section, IndigoSection, QuoteDivider, Icons, QCtx, useQuestionnaire });
