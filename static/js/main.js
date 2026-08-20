(() => {
  const navItems = [...document.querySelectorAll('.dock-item[data-nav]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const targetButton = document.querySelector('.primary-action');

  function setActive(id) {
    navItems.forEach(item => item.classList.toggle('active', item.dataset.nav === id));
  }

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, {threshold:[0.25,0.55,0.8]});
  sections.forEach(section => observer.observe(section));
  targetButton?.addEventListener('click', () => document.getElementById(targetButton.dataset.target)?.scrollIntoView({behavior:'smooth'}));

  const items = [...document.querySelectorAll('.orbit-item')];
  const center = document.getElementById('centerImage');
  const counter = document.getElementById('centerCounter');
  let selected = 0;
  let timer;

  function choose(index, userAction=true) {
    if (!items.length) return;
    selected = (index + items.length) % items.length;
    items.forEach((item, i) => item.classList.toggle('selected', i === selected));
    const item = items[selected];
    if (center) {
      center.style.opacity = '0.35';
      center.style.transform = 'scale(.985)';
      const img = new Image();
      img.onload = () => {
        center.src = item.dataset.image;
        center.style.opacity = '1';
        center.style.transform = 'scale(1)';
      };
      img.src = item.dataset.image;
    }
    if (counter) counter.textContent = `${String(selected+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
    if (userAction) restartAuto();
  }
  function next(){choose(selected+1)}
  function prev(){choose(selected-1)}
  function restartAuto(){clearInterval(timer); timer=setInterval(next, 5000)}
  items.forEach(item => item.addEventListener('click', () => choose(Number(item.dataset.index))));
  document.querySelector('[data-gallery-next]')?.addEventListener('click', next);
  document.querySelector('[data-gallery-prev]')?.addEventListener('click', prev);
  choose(0, false); restartAuto();

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') closeLightbox();
  });

  let startX = 0;
  const stage = document.querySelector('.gallery-stage');
  stage?.addEventListener('touchstart', e => startX = e.changedTouches[0].clientX, {passive:true});
  stage?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) dx < 0 ? next() : prev();
  }, {passive:true});

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  function openLightbox(src){lightboxImage.src=src;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
  function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
  document.querySelectorAll('[data-lightbox]').forEach(btn => btn.addEventListener('click',()=>openLightbox(btn.dataset.lightbox)));
  document.querySelector('[data-close-lightbox]')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => {if(e.target===lightbox) closeLightbox()});
})();
