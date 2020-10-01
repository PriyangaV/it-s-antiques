import React from 'react';

const Hero = ({ children }) => {
  return (
    <div className="hero">
      <div className="banner">
        <h1>It's Antique</h1>
        <p>
          Antique pieces are hard to find, and for some cases, antique stores
          are even harder to find
        </p>
        {children}
      </div>
    </div>
  );
};

export default Hero;
