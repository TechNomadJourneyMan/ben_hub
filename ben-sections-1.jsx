/* BEN v3 — Header, Hero, Checklist, Stats — i18n */

function StickyHeaderV3({ onCTA, theme, onToggleTheme }) {
  const { T } = useLang();
  const [show, setShow] = React.useState(false);
  const countdown = useCountdown();
  const pad = n => String(n).padStart(2, '0');
  React.useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header className="sticky-header" style={{ transform: show ? 'translateY(0)' : 'translateY(-100%)', opacity: show ? 1 : 0 }}>
      <div className="ben-container header-inner">
        <img src="uploads/лого ben1.jpeg" alt="BEN" className="header-logo"/>
        <div className="header-center">
          <span className="header-timer-text">{pad(countdown.d)}д {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}</span>
        </div>
        <div className="header-actions">
          <LangSwitcher/>
          <ThemeToggleBtn theme={theme} onToggle={onToggleTheme}/>
          <button onClick={onCTA} className="btn-ghost btn-sm">{T.nav.joinBtn}</button>
          <button onClick={onCTA} className="btn-orange btn-sm">{T.nav.payBtn}</button>
        </div>
      </div>
    </header>
  );
}

function HeroSectionV3({ onCTA }) {
  const { T, t } = useLang();
  const countdown = useCountdown();
  const pad = n => String(n).padStart(2, '0');
  return (
    <section id="hero" className="hero-section">
      <div className="ben-container">
        <div className="hero-grid">
          <div className="hero-left">
            {/* Block 1: Hook */}
            <div className="hero-block hero-block-hook">
              <FadeIn><div className="hero-badge">{T.hero.badge}</div></FadeIn>
              <FadeIn delay={0.08}>
                <h1 className="hero-h1">
                  {T.hero.h1a}<br/>
                  <span className="hero-accent">{T.hero.h1b}</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.13}><div className="hero-practice-line">{T.hero.practiceLine}</div></FadeIn>
              <FadeIn delay={0.16}><p className="hero-sub">{T.hero.sub}</p></FadeIn>
            </div>
            {/* Block 2: CTA */}
            <div className="hero-block hero-block-cta">
              <FadeIn delay={0.22}>
                <div className="hero-cta-block">
                  <button onClick={onCTA} className="btn-orange btn-lg hero-btn">{T.hero.cta} <Icons.ArrowRight/></button>
                  <span className="hero-cta-sub">{T.hero.ctaSub}</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.30}>
                <div className="hero-logos">
                  <span className="hero-logos-label">{T.hero.trustedBy}</span>
                  <div className="hero-logos-row">
                    {T.industries.map((ind, i) => <span key={i} className="hero-logo-pill">{ind}</span>)}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="hero-right">
            <FadeIn delay={0.2}>
              <div className="hero-right-card">
                <div className="hero-photo-wrap">
                  <img src="uploads/WhatsApp Image 2026-04-26 at 22.29.56.jpeg" alt={T.expert.name} className="hero-photo"/>
                  <div className="hero-timer-corner">
                    <div className="timer-unit"><span className="timer-num">{pad(countdown.d)}</span><span className="timer-lbl">д</span></div>
                    <span className="timer-sep">:</span>
                    <div className="timer-unit"><span className="timer-num">{pad(countdown.h)}</span><span className="timer-lbl">ч</span></div>
                    <span className="timer-sep">:</span>
                    <div className="timer-unit"><span className="timer-num">{pad(countdown.m)}</span><span className="timer-lbl">м</span></div>
                    <span className="timer-sep">:</span>
                    <div className="timer-unit"><span className="timer-num">{pad(countdown.s)}</span><span className="timer-lbl">с</span></div>
                  </div>
                  <div className="hero-photo-badge">
                    <span className="photo-badge-label">{T.hero.speakerLabel}</span>
                    <strong>{T.expert.name}</strong>
                    <span>{T.hero.speakerRole}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenSystemSection() {
  const { T } = useLang();
  const colors = ['#4F54E8','#10B981','#F59E0B','#EF4444'];
  const icons = [Icons.DollarSign, Icons.TrendingUp, Icons.Target, Icons.Layers];
  return (
    <IndigoSection id="ben-system">
      <FadeIn>
        <div style={{textAlign:'center', marginBottom: 40}}>
          <span className="section-label">{T.program.label}</span>
          <h2 className="section-title">{T.hero.h1c} <span style={{color:'var(--orange)'}}>{T.hero.h1d}</span></h2>
        </div>
      </FadeIn>
      <div className="bensys-grid">
        {T.program.tabs.map((tab, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bensys-card" style={{'--sc': colors[i]}}>
                <div className="bensys-icon"><Icon/></div>
                <div className="bensys-label">{tab.label}</div>
                <div className="bensys-sub">{tab.sub}</div>
                <div className="bensys-result">{tab.bottom}</div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </IndigoSection>
  );
}

function ChecklistSection({ onCTA }) {
  const { T } = useLang();
  const [checked, setChecked] = React.useState(new Set());
  const show = checked.size >= 1;
  const toggle = i => setChecked(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <Section id="checklist">
      <FadeIn>
        <div style={{textAlign:'center'}}>
          <h2 className="section-title">{T.checklist.title}</h2>
        </div>
      </FadeIn>
      <div className="checklist-grid">
        {T.checklist.items.map((p, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <button className={`check-card ${checked.has(i) ? 'checked' : ''}`} onClick={() => toggle(i)}>
              <div className="check-num">{checked.has(i) ? <Icons.Check/> : String(i+1).padStart(2,'0')}</div>
              <span className="check-text">{p}</span>
            </button>
          </FadeIn>
        ))}
      </div>
      <div className={`diagnosis-block ${show ? 'visible' : ''}`}>
        <div className="diagnosis-inner">
          <div><strong>{T.checklist.diagnosisStrong}</strong><span>{T.checklist.diagnosisText}</span></div>
          <button onClick={onCTA} className="btn-orange btn-sm">{T.nav.joinBtn}</button>
        </div>
      </div>
    </Section>
  );
}

function ParticipantOfferBlock() {
  const { T } = useLang();
  return (
    <div className="participant-offer-row">
      <div className="ben-container">
        <FadeIn>
          <div className="participant-offer-card">
            <div className="participant-offer-icon">
              <Icons.Gift/>
            </div>
            <div className="participant-offer-body">
              <div className="participant-offer-title">{T.participantOffer.title}</div>
              <div className="participant-offer-desc">{T.participantOffer.desc}</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

Object.assign(window, { StickyHeaderV3, HeroSectionV3, BenSystemSection, ChecklistSection, ParticipantOfferBlock });
