import React from 'react';

const BeamCard = React.memo(({ title, description, imageSrc }) => {
  return (
    <div className="beam-card">
      <img src={imageSrc} alt={title} loading="lazy" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
});

BeamCard.displayName = 'BeamCard';

export default BeamCard;
