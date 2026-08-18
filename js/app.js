(() => {
  const sections = [...document.querySelectorAll('.page-section')];
  const navItems = [...document.querySelectorAll('[data-section]')];
  const images = [
    'photo_2025-10-21_18-15-17.jpg','photo_2025-10-21_18-15-18.jpg','photo_2025-10-21_18-15-01.jpg','photo_2025-10-21_18-15-10.jpg',
    'photo_2025-10-21_18-15-12.jpg','photo_2025-10-21_18-15-13.jpg','photo_2025-10-21_18-15-15.jpg','photo_2025-10-21_18-15-16.jpg'
  ];
  let active = 'about';
  let current = 0;
  let startX = null;
  const track = document.getElementById('galleryTrack');
  const stage = document.getElementById('galleryStage');
  const currentEl = document.getElementById('galleryCurrent');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');

  function showSection(id) {
    active = id;
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    document.querySelectorAll('.dock-item').forEach(x => x.classList.toggle('active', x.dataset.section === id));
    document.querySelectorAll('.text-button').forEach(x => x.classList.toggle('active', x.dataset.section === id));
    window.scrollTo({top:0, behavior:'smooth'});
    if(id === 'gallery') renderGallery();
  }
  navItems.forEach(item => item.addEventListener('click', e => {
    if(item.tagName === 'A' && item.getAttribute('href')?.startsWith('http')) return;
    e.preventDefault(); showSection(item.dataset.section);
  }));

  function renderGallery() {
    if(!track) return;
    const n = images.length;
    track.innerHTML = images.map((src, i) => `<button class="gallery-card" data-index="${i}" aria-label="تصویر ${i+1}"><img src="assets/img/${src}" alt="تصویر ${i+1}" loading="lazy"></button>`).join('');
    const cards = [...track.children];
    cards.forEach((card, i) => {
      const offset = ((i-current+n)%n);
      const signed = offset > n/2 ? offset-n : offset;
      const abs = Math.abs(signed);
      const x = signed * Math.min(155, stage.clientWidth*.16);
      const z = -abs * 75;
      const y = abs * 13;
      const scale = abs === 0 ? 1.18 : Math.max(.68, 1 - abs*.09);
      const opacity = abs > 3 ? .05 : Math.max(.25, 1-abs*.2);
      card.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateY(${signed*-9}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.filter = abs === 0 ? 'none' : `grayscale(${Math.min(.7,abs*.18)})`;
      card.style.zIndex = String(20-abs);
      card.classList.toggle('is-center', abs===0);
      card.onclick = () => { current=i; renderGallery(); openLightbox(i); };
    });
    currentEl.textContent = String(current+1).padStart(2,'0');
  }
  function next(){current=(current+1)%images.length;renderGallery()}
  function prev(){current=(current-1+images.length)%images.length;renderGallery()}
  document.querySelector('.gallery-arrow.next').onclick=next;
  document.querySelector('.gallery-arrow.prev').onclick=prev;
  stage?.addEventListener('touchstart',e=>startX=e.touches[0].clientX,{passive:true});
  stage?.addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)dx<0?next():prev();startX=null},{passive:true});
  document.addEventListener('keydown',e=>{if(active==='gallery'){if(e.key==='ArrowRight')prev();if(e.key==='ArrowLeft')next()}if(lightbox.classList.contains('open')){if(e.key==='Escape')closeLightbox();if(e.key==='ArrowRight')openLightbox((current-1+images.length)%images.length);if(e.key==='ArrowLeft')openLightbox((current+1)%images.length)}});
  function openLightbox(i){current=i;lightboxImage.src=`assets/img/${images[i]}`;lightboxImage.alt=`تصویر ${i+1}`;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}
  function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true')}
  document.querySelector('.lightbox-close').onclick=closeLightbox;
  document.querySelector('.lightbox-prev').onclick=()=>openLightbox((current-1+images.length)%images.length);
  document.querySelector('.lightbox-next').onclick=()=>openLightbox((current+1)%images.length);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
  window.addEventListener('resize',()=>active==='gallery'&&renderGallery());
  renderGallery();
})();
