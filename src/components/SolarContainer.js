import React from 'react';

const SolarContainer = ({ children }) => {
  return (
    <div className="solar-container">
      <div className="sun"></div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`planet planet-${i + 1}`}></div>
      ))}
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default SolarContainer;
