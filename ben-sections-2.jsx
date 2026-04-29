/* BEN v3 — Program, Roadmap, Expert — i18n */

function ProgramSection() {
  const { T } = useLang();
  const colors = ['#4F54E8','#10B981','#F59E0B','#EF4444'];
  const icons = [Icons.DollarSign, Icons.TrendingUp, Icons.Target, Icons.Layers];

  return (
    <IndigoSection id="program">
      <FadeIn>
        <div style={{textAlign:'center', marginBottom: 48}}>
          <span className="section-label">{T.program.label}</span>
          <h2 className="section-title">{T.program.title}<span style={{color:'var(--orange)'}}>{T.program.titleAccent}</span></h2>
        </div>
      </FadeIn>
      <div className="prog-scheme">
        <FadeIn className="prog-scheme-photo-col" delay={0.05}>
          <div className="prog-scheme-photo-wrap">
            <img src="uploads/WhatsApp Image 2026-04-26 at 22.29.56.jpeg" alt={T.expert.name} className="prog-scheme-photo" loading="lazy"/>
            <div className="prog-scheme-photo-overlay">
              <div className="prog-scheme-expert-badge">
                <span className="prog-scheme-expert-label">{T.expert.label}</span>
                <strong>{T.expert.name}</strong>
                <span>{T.expert.role}</span>
              </div>
              <div className="prog-scheme-stats">
                {T.expert.stats.map(([v,l],i) => (
                  <div key={i} className="prog-scheme-stat">
                    <span className="prog-scheme-stat-val">{v}</span>
                    <span className="prog-scheme-stat-lbl">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="prog-scheme-cards">
          {T.program.tabs.map((tab, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div className="prog-scheme-card" style={{'--pc': colors[i]}}>
                  <div className="prog-scheme-card-head">
                    <div className="prog-scheme-card-icon"><Icon/></div>
                    <div>
                      <div className="prog-scheme-card-label">{tab.label}</div>
                      <div className="prog-scheme-card-sub">{tab.sub}</div>
                    </div>
                    <span className="prog-scheme-card-num">0{i+1}</span>
                  </div>
                  <ul className="prog-scheme-card-items">
                    {tab.items.map((item, j) => (
                      <li key={j}><span style={{color: colors[i]}}>→</span>{item}</li>
                    ))}
                  </ul>
                  <div className="prog-scheme-card-result">
                    <Icons.Gift/>
                    <span>{tab.result}</span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
      <FadeIn delay={0.4}>
        <div className="prog-outcomes">
          {T.program.tabs.map((tab, i) => (
            <div key={i} className="prog-outcome" style={{borderColor: colors[i]+'50', background: colors[i]+'10'}}>
              <span className="prog-outcome-dot" style={{background: colors[i]}}></span>
              {tab.bottom}
            </div>
          ))}
        </div>
      </FadeIn>
    </IndigoSection>
  );
}

function BenRoadmapSection() {
  const { T } = useLang();
  const colors = ['#4F54E8','#10B981','#F59E0B','#EF4444'];
  const icons = [Icons.DollarSign, Icons.TrendingUp, Icons.Target, Icons.Layers];
  return (
    <section id="roadmap" className="roadmap-section">
      <div className="ben-container">
        <FadeIn>
          <div className="roadmap-header">
            <div className="roadmap-big-num">4</div>
            <div className="roadmap-header-body">
              <h2 className="roadmap-title">{T.fourDays.title}</h2>
              <p className="roadmap-sub">{T.fourDays.conclusion}</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="roadmap-chain">
            {T.fourDays.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <React.Fragment key={i}>
                  <div className="roadmap-node" style={{'--rc': colors[i]}}>
                    <div className={`roadmap-node-label ${i % 2 === 0 ? 'top' : 'bottom'}`}>{item}</div>
                    <div className="roadmap-circle">
                      <div className="roadmap-circle-inner"><Icon/></div>
                      <span className="roadmap-circle-num">{i + 1}</span>
                    </div>
                    <div className={`roadmap-node-label ${i % 2 === 0 ? 'bottom' : 'top'} roadmap-node-label--day`}>
                      {T.program.tabs[i] ? T.program.tabs[i].sub : ''}
                    </div>
                  </div>
                  {i < T.fourDays.items.length - 1 && (
                    <div className="roadmap-connector">
                      <div className="roadmap-line" style={{background: `linear-gradient(90deg, ${colors[i]}, ${colors[i+1]})`}}></div>
                      <span className="roadmap-arrow">→</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            <div className="roadmap-result-node">
              <div className="roadmap-result-circle">
                <Icons.CheckCircle/>
              </div>
              <div className="roadmap-result-label top">{T.fourDays.result}</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
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

Object.assign(window, { ProgramSection, BenRoadmapSection, ExpertSection });
