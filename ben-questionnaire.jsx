/* BEN v3 — Questionnaire Modal — i18n */

function Questionnaire({ open, onClose }) {
  const { T, t } = useLang();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', phone: '' });
  const [formErr, setFormErr] = React.useState({});

  const Q = T.questionnaire;
  const steps = Q.steps;

  React.useEffect(() => {
    setStep(0); setAnswers({}); setSubmitted(false); setForm({name:'',phone:''}); setFormErr({});
  }, [T]);

  const handleOption = (key, val) => {
    setAnswers(p => ({ ...p, [key]: val }));
    setTimeout(() => setStep(s => s + 1), 280);
  };

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = Q.errName;
    if (!form.phone.trim() || form.phone.replace(/\D/g,'').length < 7) errs.phone = Q.errPhone;
    setFormErr(errs);
    return Object.keys(errs).length === 0;
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(0); setAnswers({}); setSubmitted(false); setForm({name:'',phone:''}); }, 400);
  };

  const progress = submitted ? 100 : ((step / (steps.length + 1)) * 100);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-progress-bar"><div className="modal-progress-fill" style={{width:`${progress}%`}}></div></div>
          <button className="modal-close" onClick={handleClose}><Icons.X/></button>
        </div>

        {submitted ? (
          <div className="modal-success">
            <Icons.CheckCircle/>
            <h3>{Q.successTitle}</h3>
            <p>{Q.successText}</p>
            <div className="modal-success-details">
              <span>{Q.successDetails}</span>
              <strong>{T.offer.price}</strong>
            </div>
            <button className="btn-orange btn-lg" onClick={handleClose}>{Q.closeBtn}</button>
          </div>
        ) : step < steps.length ? (
          <div className="modal-step" key={step}>
            <div className="modal-step-counter">{t(Q.stepOf,{s:step+1,t:steps.length+1})}</div>
            <h2 className="modal-title">{steps[step].title}</h2>
            <div className="modal-options">
              {steps[step].options.map((opt, i) => (
                <button key={i}
                  className={`modal-option ${answers[`q${step}`] === opt.label ? 'selected' : ''}`}
                  onClick={() => handleOption(`q${step}`, opt.label)}>
                  <div className="modal-option-check">
                    {answers[`q${step}`] === opt.label && <Icons.Check/>}
                  </div>
                  <div>
                    <span className="modal-option-label">{opt.label}</span>
                    <span className="modal-option-desc">{opt.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form className="modal-step" key="form" onSubmit={e => { e.preventDefault(); if(validateForm()) { setSubmitted(true); window.dispatchEvent(new Event('ben:reserved')); } }}>
            <div className="modal-step-counter">{t(Q.stepOf,{s:steps.length+1,t:steps.length+1})}</div>
            <h2 className="modal-title">{Q.contactTitle}</h2>
            <p className="modal-subtitle">{Q.contactSub}</p>
            <div className="modal-form-fields">
              <div className="form-group">
                <label>{Q.nameLabel}</label>
                <input type="text" placeholder={Q.namePlaceholder} value={form.name}
                  className={formErr.name ? 'error' : ''}
                  onChange={e => { setForm(p=>({...p,name:e.target.value})); setFormErr(p=>({...p,name:''})); }}/>
                {formErr.name && <span className="form-err">{formErr.name}</span>}
              </div>
              <div className="form-group">
                <label>{Q.phoneLabel}</label>
                <input type="tel" placeholder={Q.phonePlaceholder} value={form.phone}
                  className={formErr.phone ? 'error' : ''}
                  onChange={e => { setForm(p=>({...p,phone:e.target.value})); setFormErr(p=>({...p,phone:''})); }}/>
                {formErr.phone && <span className="form-err">{formErr.phone}</span>}
              </div>
            </div>
            <button type="submit" className="btn-orange btn-lg" style={{width:'100%',marginTop:8}}>{Q.submitCta}</button>
          </form>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Questionnaire });
