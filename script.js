// Tiny helpers
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* =========================
   Carousel (Home)
========================= */
(function(){
  const track = $('.carousel-track');
  if(!track) return;

  const slides = [
    'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545357790-63bd5b2529e4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534759846116-57970a3d1e39?q=80&w=1600&auto=format&fit=crop'
  ];

  let idx = 0, playing = true, timer = null;
  const img = document.createElement('img');
  img.alt = 'Robotics activity slideshow image';
  track.appendChild(img);

  const status = $('.status');
  const setSlide = (i)=>{
    idx = (i + slides.length) % slides.length;
    img.src = slides[idx];
    if(status) status.textContent = `Slide ${idx+1} of ${slides.length}`;
  };
  setSlide(0);

  const play = ()=>{ if(timer) clearInterval(timer); timer = setInterval(()=>setSlide(idx+1), 4000); playing = true; };
  const pause = ()=>{ if(timer) clearInterval(timer); timer = null; playing = false; };

  const prevBtn = $('#prev'), nextBtn = $('#next'), pauseBtn = $('#pause');
  prevBtn?.addEventListener('click',()=> setSlide(idx-1));
  nextBtn?.addEventListener('click',()=> setSlide(idx+1));
  pauseBtn?.addEventListener('click',()=>{
    if(playing){ pause(); pauseBtn.textContent='Play'; pauseBtn.setAttribute('aria-pressed','true'); }
    else { play(); pauseBtn.textContent='Pause'; pauseBtn.setAttribute('aria-pressed','false'); }
  });

  track.tabIndex = 0;
  track.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight'){ setSlide(idx+1); }
    if(e.key==='ArrowLeft'){ setSlide(idx-1); }
    if(e.key===' '){ e.preventDefault(); pauseBtn?.click(); }
  });

  play();
})();

/* =========================
   Programs filter
========================= */
(function(){
  const sel = $('#ageFilter');
  const count = $('#resultsCount');
  if(!sel) return;

  const cards = $$('.program');
  const filter = ()=>{
    const val = sel.value;
    let visible = 0;
    cards.forEach(c=>{
      const [min,max] = c.getAttribute('data-age').split('-').map(Number);
      const [fmin,fmax] = val.split('-').map(Number);
      const show = (min >= fmin && max <= fmax);
      c.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    if(count){ count.textContent = `${visible} program(s) match your selection.`; }
  };

  sel.addEventListener('change', filter);
  filter();
})();

/* =========================
   FAQ accordion (one open)
========================= */
(function(){
  const faqs = $$('details.faq');
  if(!faqs.length) return;
  faqs.forEach(d => {
    d.addEventListener('toggle', ()=>{
      if(d.open){ faqs.forEach(o => { if(o!==d) o.open = false; }); }
    });
  });
})();

/* =========================
   Form validation
========================= */
(function(){
  const form = $('#registerForm');
  if(!form) return;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const show = (id,msg) => { const el = document.getElementById(id); if(el){ el.textContent = msg; el.hidden = !msg; } };

  form.addEventListener('submit', (e)=>{
    let ok = true;
    const parent = form.parentName.value.trim();
    const email  = form.email.value.trim();
    const age    = form.childAge.value.trim();
    const prog   = form.program.value;
    const consent= form.consent.checked;

    show('errParent',''); show('errEmail',''); show('errAge',''); show('errProgram',''); show('errConsent','');

    if(!parent){ show('errParent','Parent/Guardian name is required.'); ok=false; }
    if(!emailRe.test(email)){ show('errEmail','Enter a valid email address.'); ok=false; }
    if(!age || isNaN(Number(age)) || Number(age)<5 || Number(age)>18){ show('errAge','Enter a valid age between 5 and 18.'); ok=false; }
    if(!prog){ show('errProgram','Please select a program.'); ok=false; }
    if(!consent){ show('errConsent','Consent is required.'); ok=false; }

    if(!ok){ e.preventDefault(); }
  });
})();
