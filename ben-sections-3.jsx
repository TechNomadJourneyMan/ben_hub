/* BEN v3 — Testimonials, Offer, FAQ, FinalCTA, Footer — i18n */

const INDUSTRY_COLORS = ['#4F54E8','#10B981','#F59E0B','#EF4444','#8B5CF6','#06B6D4','#F97316','#6B7280'];

function TestimonialsSection() {
  const { T } = useLang();
  const items = T.testimonials.items;
  const total = items.reduce((s, it) => s + it.pct, 0);
  // Build donut segments
  let offset = 0;
  const r = 70, cx = 90, cy = 90, stroke = 28;
  const circ = 2 * Math.PI * r;
  const segments = items.map((it, i) => {
    const dash = (it.pct / total) * circ;
    const seg = { it, i, dash, gap: circ - dash, offset };
    offset += dash;
    return seg;
  });
  return (
    <Section id="testimonials">
      <FadeIn>
        <div style={{textAlign:'center', marginBottom: 48}}>
          <span className="section-label">{T.testimonials.label}</span>
          <h2 className="section-title">{T.testimonials.title}</h2>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="industries-wrap">
          <div className="industries-donut">
            <svg viewBox="0 0 180 180" className="donut-svg">
              {segments.map(({it, i, dash, gap, offset: off}) => (
                <circle
                  key={i}
                  className="donut-seg"
                  cx={cx} cy={cy} r={r}
                  fill="none"
                  stroke={INDUSTRY_COLORS[i]}
                  strokeWidth={stroke}
                  strokeDasharray={`${dash - 2} ${gap + 2}`}
                  strokeDashoffset={-off + circ / 4}
                  style={{transition: 'stroke-dasharray .6s ease', opacity: .92}}
                />
              ))}
              <circle cx={cx} cy={cy} r={r - stroke/2 - 2} fill="var(--bg-card)" opacity="1"/>
              <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)" fontFamily="'Space Grotesk', sans-serif">1 500+</text>
              <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="'DM Sans', sans-serif">компаний</text>
            </svg>
          </div>
          <div className="industries-legend">
            {items.map((it, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="industry-row">
                  <span className="industry-dot" style={{background: INDUSTRY_COLORS[i]}}></span>
                  <span className="industry-icon">{it.icon}</span>
                  <span className="industry-name">{it.company}</span>
                  <div className="industry-bar-wrap">
                    <div className="industry-bar" style={{width: `${it.pct}%`, background: INDUSTRY_COLORS[i]}}></div>
                  </div>
                  <span className="industry-pct" style={{color: INDUSTRY_COLORS[i]}}>{it.pct}%</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

function OfferSectionV3({ onCTA }) {
  const { T } = useLang();
  return (
    <IndigoSection id="offer">
      <FadeIn>
        <div style={{textAlign:'center'}}>
          <span className="section-label">{T.offer.label}</span>
          <h2 className="section-title">{T.offer.title}</h2>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="offer-card">
          <div className="offer-items">
            {T.offer.items.map((it,i) => (
              <div key={i} className="offer-item">
                <div className="offer-item-check"><Icons.Check/></div>
                <span className="offer-item-name">{it.name}</span>
              </div>
            ))}
          </div>
          <div className="offer-sep"></div>
          <div className="offer-price-row">
            <div className="offer-price-stack">
              <s className="offer-price-old-top">{T.offer.oldTotal}</s>
              <span className="offer-price-big">{T.offer.price}</span>
            </div>
            <span className="offer-price-note">{T.offer.priceNote}</span>
          </div>
          <button onClick={onCTA} className="btn-orange offer-btn">{T.offer.cta} <Icons.ArrowRight/></button>
        </div>
      </FadeIn>
    </IndigoSection>
  );
}

function FAQSection() {
  const { T } = useLang();
  const [open, setOpen] = React.useState(null);
  return (
    <Section id="faq">
      <FadeIn>
        <div style={{textAlign:'center'}}>
          <span className="section-label">{T.faq.label}</span>
          <h2 className="section-title">{T.faq.title}</h2>
        </div>
      </FadeIn>
      <div className="faq-list">
        {T.faq.items.map((it, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {it.q}
                <span className="faq-icon" style={{transform: open===i ? 'rotate(180deg)' : 'none'}}><Icons.ChevronDown/></span>
              </button>
              <div className="faq-a" style={{maxHeight: open===i ? 200 : 0, opacity: open===i ? 1 : 0, paddingBottom: open===i ? 20 : 0}}>
                <p>{it.a}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA({ onCTA }) {
  const { T } = useLang();
  const countdown = useCountdown();
  const pad = n => String(n).padStart(2, '0');
  return (
    <section id="final-cta" className="final-cta-section">
      <div className="ben-container">
        <FadeIn>
          <div className="final-cta-inner">
            <h2 className="final-cta-title">{T.finalCta.title}</h2>
            <div className="final-timer-row">
              {[['д',countdown.d],['ч',countdown.h],['мин',countdown.m],['сек',countdown.s]].map(([l,v],i)=>(
                <div key={i} className="final-timer-block">
                  <span className="final-timer-num">{pad(v)}</span>
                  <span className="final-timer-lbl">{l}</span>
                </div>
              ))}
            </div>
            <button onClick={onCTA} className="btn-orange" style={{fontSize:18,padding:'20px 44px',borderRadius:12}}>
              {T.finalCta.cta} <Icons.ArrowRight/>
            </button>
            <div className="final-payment-row">
              {['Kaspi Pay','Apple Pay','Visa','Mastercard'].map((p,i)=>(
                <span key={i} className="pay-badge">{p}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function BenFooter() {
  const { T } = useLang();
  return (
    <footer className="ben-footer">
      <div className="ben-container footer-inner">
        <img src="uploads/лого ben1.jpeg" alt="BEN" className="footer-logo"/>
        <span className="footer-copy">{T.footer.copy}</span>
        <div className="footer-links">
          <a href="#">{T.footer.privacy}</a>
          <a href="#">{T.footer.offer}</a>
        </div>
      </div>
    </footer>
  );
}

function FourDaysSection({ onCTA }) {
  const { T } = useLang();
  const countdown = useCountdown();
  const pad = n => String(n).padStart(2, '0');
  const colors = ['#4F54E8','#10B981','#F59E0B','#EF4444'];
  const icons = [Icons.DollarSign, Icons.TrendingUp, Icons.Target, Icons.Layers];
  return (
    <Section id="four-days">
      <FadeIn>
        <div style={{textAlign:'center', marginBottom: 40}}>
          <h2 className="section-title">{T.fourDays.title}</h2>
        </div>
      </FadeIn>
      <div className="four-days-grid">
        {T.fourDays.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="four-days-card" style={{'--accent': colors[i]}}>
                <div className="four-days-card-icon" style={{background: colors[i]+'20', color: colors[i]}}>
                  <Icon/>
                </div>
                <p className="four-days-card-text">{item}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
      <FadeIn delay={0.3}>
        <div className="four-days-conclusion">
          <p className="four-days-conclusion-main">{T.fourDays.conclusion}</p>
          <p className="four-days-conclusion-result">{T.fourDays.result}</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div className="four-days-cta">
          <div className="final-timer-row" style={{justifyContent:'center', marginBottom: 20}}>
            {[['д',countdown.d],['ч',countdown.h],['мин',countdown.m],['сек',countdown.s]].map(([l,v],i)=>(
              <div key={i} className="final-timer-block">
                <span className="final-timer-num">{pad(v)}</span>
                <span className="final-timer-lbl">{l}</span>
              </div>
            ))}
          </div>
          <button onClick={onCTA} className="btn-orange" style={{fontSize:17,padding:'16px 40px',borderRadius:12}}>
            {T.fourDays.cta} <Icons.ArrowRight/>
          </button>
        </div>
      </FadeIn>
    </Section>
  );
}

Object.assign(window, { TestimonialsSection, OfferSectionV3, FAQSection, FinalCTA, BenFooter, FourDaysSection });
