import React, { useState } from 'react';

const HeroBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const changeSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 id="heroTitle">Loki: Season 2</h1>
        <p id="heroDesc">
          The God of Mischief navigates the ever-expanding multiverse.
        </p>
        <div className="hero-btns">
          <button className="btn-play">▶ Play</button>
          <button className="btn-add">+ My List</button>
        </div>
      </div>

      <button className="hero-arrow left" onClick={() => {/* handle prev slide */}}>❮</button>
      <button className="hero-arrow right" onClick={() => {/* handle next slide */}}>❯</button>

      <div className="hero-dots">
        {[0, 1, 2, 3, 4].map((index) => (
          <span 
            key={index}
            className={`dot ${activeSlide === index ? 'active' : ''}`} 
            onClick={() => changeSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;