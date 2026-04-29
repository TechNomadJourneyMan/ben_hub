/* BEN v3 — Program, Comparison, Expert — i18n */

function ProgramSection() {
  const { T } = useLang();
  const colors = ['#4F54E8','#10B981','#F59E0B','#EF4444'];
  const tabIcons = [Icons.DollarSign, Icons.TrendingUp, Icons.Target, Icons.Layers];
  const [active, setActive] = React.useState(0);
  const tab = T.program.tabs[active];
  const color = colors[active];
  const Icon = tabIcons[active];

  return (
    <IndigoSection id="program">
      <FadeIn>
        <div style={{textAlign:'center'}}>
          <span className="section-label">{T.program.label}</span>
          <h2 className="section-title">{T.program.title}<span style={{color:'var(--orange)'}}>{T.program.titleAccent}</span></h2>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="prog-tabs">
          {T.program.tabs.map((tab, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`prog-tab ${active === i ? 'active' : ''}`}
              style={active === i ? { borderColor: colors[i], color: colors[i], background: colors[i]+'15' } : {}}>
              <span className="prog-tab-label">{tab.label}</span>
              <span className="prog-tab-sub">{tab.sub}</span>
            </button>
          ))}
        </div>
      </FadeIn>
      <div className="prog-card" key={active}>
        <FadeIn>
          <div className="prog-card-inner">
            <div className="prog-card-left">
              <div className="prog-icon" style={{ background: color+'20', color }}><Icon/></div>
              <h3 className="prog-heading">{tab.heading}</h3>
              <ul className="prog-items">
                {tab.items.map((item, i) => (
                  <li key={i}><span className="prog-arrow" style={{color}}>→</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="prog-card-right">
              <div className="prog-gift" style={{ borderColor: color+'40', background: color+'0D' }}>
                <Icons.Gift/>
                <div>
                  <div style={{fontSize:12,opacity:.6,marginBottom:4}}>{T.program.giftLabel}</div>
                  <strong>{tab.result}</strong>
                </div>
              </div>
              <div className="prog-result-tag" style={{ borderColor: color+'50', color }}>{tab.tagline}</div>
            </div>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={0.2}>
        <div className="prog-outcomes">
          {T.program.tabs.map((tab, i) => (
            <div key={i}
              className={`prog-outcome ${active === i ? 'active' : ''}`}
              style={active === i ? { borderColor: colors[i], background: colors[i]+'10' } : {}}
              onClick={() => setActive(i)}>
              <span className="prog-outcome-dot" style={{background: colors[i]}}></span>
              {tab.bottom}
            </div>
          ))}
        </div>
      </FadeIn>
    </IndigoSection>
  );
}

function ComparisonSection() {
  const { T } = useLang();
  return (
    <Section id="comparison">
      <FadeIn>
        <div style={{textAlign:'center'}}>
          <span className="section-label">{T.comparison.label}</span>
          <h2 className="section-title">{T.comparison.title}</h2>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="comp-table">
          <div className="comp-head">
            <div className="comp-cell-label"></div>
            <div className="comp-cell comp-col-other">{T.comparison.colOther}</div>
            <div className="comp-cell comp-col-ben">{T.comparison.colBen}</div>
          </div>
          {T.comparison.rows.map(([label, other, ben], i) => (
            <div key={i} className="comp-row">
              <div className="comp-cell-label">{label}</div>
              <div className="comp-cell comp-col-other"><span className="comp-x">✕</span>{other}</div>
              <div className="comp-cell comp-col-ben"><span className="comp-ok">✓</span>{ben}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

function ExpertSection() {
  const { T } = useLang();
  return (
    <IndigoSection id="expert">
      <div className="expert-grid">
        <FadeIn className="expert-photo-col">
          <div className="expert-img-wrap">
            <img src="uploads/WhatsApp Image 2026-04-26 at 22.29.56.jpeg" alt={T.expert.name} className="expert-img" loading="lazy" decoding="async"/>
          </div>
        </FadeIn>
        <FadeIn delay={0.15} className="expert-info-col">
          <span className="section-label">{T.expert.label}</span>
          <h2 className="expert-name">{T.expert.name}</h2>
          <p className="expert-role">{T.expert.role}</p>
          <div className="expert-stats-row">
            {T.expert.stats.map(([v, l], i) => (
              <div key={i} className="expert-stat">
                <span className="expert-stat-val">{v}</span>
                <span className="expert-stat-lbl">{l}</span>
              </div>
            ))}
          </div>
          <blockquote className="expert-quote">{T.expert.quote}</blockquote>
          <p className="expert-bio">{T.expert.bio}</p>
        </FadeIn>
      </div>
    </IndigoSection>
  );
}

Object.assign(window, { ProgramSection, ComparisonSection, ExpertSection });
