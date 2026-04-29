/* BEN v3 — Testimonials, Offer, FAQ, FinalCTA, Footer — i18n */

function TestimonialsSection() {
  const { T } = useLang();
  return (
    <Section id="testimonials">
      <FadeIn>
        <div style={{textAlign:'center'}}>
          <span className="section-label">{T.testimonials.label}</span>
          <h2 className="section-title">{T.testimonials.title}</h2>
        </div>
      </FadeIn>
      <div className="testimonials-grid">
        {T.testimonials.items.map((r, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="testi-card">
              <div className="testi-video">
                <div className="testi-play"><Icons.Play/></div>
              </div>
              <div className="testi-info">
                <div className="testi-stars">{Array.from({length:5}).map((_,j)=><Icons.Star key={j}/>)}</div>
                <p className="testi-result">{r.result}</p>
                <span className="testi-company">{r.company}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.25}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {Array.from({length:14}).map((_,i)=>(
              <div key={i} className="marquee-item">{T.industries[i % T.industries.length]}</div>
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
                <span className="offer-item-price">{it.price}</span>
              </div>
            ))}
          </div>
          <div className="offer-sep"></div>
          <div className="offer-total-row">
            <span className="offer-total-label">{T.offer.totalLabel}</span>
            <s className="offer-total-old">{T.offer.oldTotal}</s>
          </div>
          <div className="offer-price-row">
            <span className="offer-price-big">{T.offer.price}</span>
            <span className="offer-price-note">{T.offer.priceNote}</span>
          </div>
          <button onClick={onCTA} className="btn-orange offer-btn">{T.offer.cta} <Icons.ArrowRight/></button>
          <div className="offer-payment">
            {['Kaspi Pay','Apple Pay','Visa','Mastercard'].map((p,i)=>(
              <span key={i} className="pay-badge">{p}</span>
            ))}
          </div>
          <div className="offer-guarantee">
            <div className="offer-guarantee-seal">
              <strong>30</strong><span>мин</span>
            </div>
            <div className="offer-guarantee-text">
              <strong>{T.offer.guaranteeTitle}</strong>
              {T.offer.guaranteeText}
            </div>
          </div>
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
