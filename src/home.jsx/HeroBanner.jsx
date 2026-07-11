import React, { useState } from 'react';

const HeroBanner = () => {
  const movies = [
    {
      id: 'lokis2',
      title: 'Loki: Season 2',
      desc: 'The God of Mischief navigates the ever-expanding multiverse.',
      img: 'https://w0.peakpx.com/wallpaper/24/583/HD-wallpaper-loki-season-2-promising-path-loki-season-2-loki-tv-shows-superheroes-artwork-digital-art.jpg'
    },
    {
      id: 'insideout2',
      title: 'Inside Out 2',
      desc: 'Riley and her emotions discover new challenges in adolescence.',
      img: 'https://m.media-amazon.com/images/S/pv-target-images/7390f647a1edb3cd152bda26e4b57a3be4e96dc603af64519a79273ab9850cd6.jpg'
    },
    {
      id: 'avengersendgame',
      title: 'Avengers: Endgame',
      desc: 'The Avengers assemble to undo Thanos’s actions and restore balance.',
      img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRXef9DJnZiq5az0UnjkmvkQufOQ5MFnF7HATYRUXN913swRuH1'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((s) => (s + 1) % movies.length);
  };

  const prevSlide = () => {
    setActiveSlide((s) => (s - 1 + movies.length) % movies.length);
  };

  const changeSlide = (index) => setActiveSlide(index);

  const current = movies[activeSlide];

  const heroStyle = {
    background: `linear-gradient(to right, rgba(15,16,20,0.95) 20%, rgba(15,16,20,0.4) 60%, rgba(15,16,20,0.1)), url(${current.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 id="heroTitle">{current.title}</h1>
        <p id="heroDesc">{current.desc}</p>
        <div className="hero-btns">
          <button className="btn-play">▶ Play</button>
          <button className="btn-add">+ My List</button>
        </div>
      </div>

      <button className="hero-arrow left" onClick={prevSlide}>❮</button>
      <button className="hero-arrow right" onClick={nextSlide}>❯</button>

      <div className="hero-dots">
        {movies.map((m, index) => (
          <span
            key={m.id}
            className={`dot ${activeSlide === index ? 'active' : ''}`}
            onClick={() => changeSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;