import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SolarContainer from './components/SolarContainer';
import BeamCard from './components/BeamCard';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const achievements = [
    { title: 'گواهینامه مربیگری کشتی', description: 'گواهینامه از فدراسیون کشتی ایران', imageSrc: '/img/photo_2025-10-21_18-13-43.jpg' },
    { title: 'مدرک علوم بدنسازی', description: 'دانشگاه علوم بدنسازی UAL', imageSrc: '/img/photo_2025-10-21_18-13-47.jpg' },
    { title: 'قهرمانی کیک بوکسینگ WASKO', description: 'جایگاه اول در مسابقات حرفه‌ای', imageSrc: '/img/photo_2025-10-21_18-13-48.jpg' },
    { title: 'گواهینامه فنی ICHMAF', description: 'دوره فنی در استان البرز', imageSrc: '/img/photo_2025-10-21_18-13-52.jpg' },
    { title: 'مدال مربیگری کشتی', description: 'همکاری با قهرمانان جوان', imageSrc: '/img/photo_2025-10-21_18-13-53.jpg' },
    { title: 'گواهینامه HCCO', description: 'تماس کامل بالا در هنرهای رزمی', imageSrc: '/img/photo_2025-10-21_18-13-54.jpg' },
  ];

  const bio = 'بهزاد ابراهیمی، مربی برجسته کشتی، بدنسازی و هنرهای رزمی با بیش از ۲۰ سال تجربه در فدراسیون‌های ورزشی ایران. او در تربیت قهرمانان و برگزاری دوره‌های آموزشی نقش کلیدی داشته است.';

  const galleryImages = [
    
    '/img/photo_2025-10-21_18-15-17.jpg',
    '/img/photo_2025-10-21_18-15-18.jpg',
    '/img/photo_2025-10-21_18-15-01.jpg',
    '/img/photo_2025-10-21_18-15-10.jpg',
    '/img/photo_2025-10-21_18-15-12.jpg',
    '/img/photo_2025-10-21_18-15-13.jpg',
    '/img/photo_2025-10-21_18-15-15.jpg',
    '/img/photo_2025-10-21_18-15-16.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
  };

  return (
    <SolarContainer>
      <header className="header">
        <a href='./'>
          <h1 className='rounded-1 text-emphasis rounded card card-header text-dark' >سایت رسمی بهزاد ابراهیمی</h1>
        </a>
        <nav className="navbar navbar-light bg-transparent justify-content-left fixed-bottom">
          <ul className="navbar-nav p-1">

            <li className="nav-item">
              <a className='nav-link dock-icon' 
                href="https://www.instagram.com/behzad.ebrahimi.official/" target="_blank" rel="noopener noreferrer" title="اینستاگرام">
                <img className="dock-icon-inner" src='img/instagram.png' />
                <span className="dock-label">instagram</span>
              </a>
            </li>


            <li className="nav-item">
              <a className={`nav-link dock-icon ${activeSection === 'achievements' ? 'active' : ''}`} href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')} title="دستاوردها">
                <span className="dock-icon-inner">🏆</span>
                <span className="dock-label">دستاوردها</span>
              </a>
            </li>



            <li className="nav-item">
              <a className={`nav-link dock-icon ${activeSection === 'gallery' ? 'active' : ''}`} href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} title="گالری تصاویر">
                <span className="dock-icon-inner">🖼️</span>
                <span className="dock-label">گالری</span>
              </a>
            </li>
            
            <li className="nav-item">
              <a className={`nav-link dock-icon ${activeSection === 'about' ? 'active' : ''}`} href="#about" onClick={(e) => handleNavClick(e, 'about')} title="درباره من">
                <span className="dock-icon-inner">🏠</span>
                <span className="dock-label">خانه</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <br />
      <section id="about" className={`section about ${activeSection === 'about' ? 'active' : ''}`}>
        <h2>درباره من</h2>
        <p>{bio}</p>

        <img src="/img/logo.jpg" alt="عکس بهزاد ابراهیمی" />
      </section>

      <section id="achievements" className={`section achievements ${activeSection === 'achievements' ? 'active' : ''}`}>
        <h2>دستاوردها</h2>
        {achievements.map((ach, index) => (
          <BeamCard key={index} title={ach.title} description={ach.description} imageSrc={ach.imageSrc} />
        ))}
      </section>

      <section id="gallery" className={`section gallery ${activeSection === 'gallery' ? 'active' : ''}`}>
        <h2>گالری تصاویر</h2>
        <div className="slideshow-container">
          <img
            src={galleryImages[currentSlide]}
            alt={`تصویر ${currentSlide + 1}`}
            className="slide"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <button className="prev" onClick={prevSlide}>❮</button>
          <button className="next" onClick={nextSlide}>❯</button>
          <div className="thumbnails">
            {galleryImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="footer text-info col-12 flex-wrap">
        <p>&copy;  2020-2025 بهزاد ابراهیمی. تمامی حقوق محفوظ است | 
          </p>
          <span className='text-danger row-cols-12'>  DEPLOYED-BY: AMZY31 </span>
      </footer>
        <br />
        <br />
        <br />
    </SolarContainer>
  );
}

export default App;
