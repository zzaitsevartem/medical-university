import React from 'react';
import { RouteData } from '../../types';

interface DiseaseCardProps {
  route: RouteData;
  onClick: (route: RouteData) => void;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ route, onClick }) => {
  return (
    <div className="disease-card" onClick={() => onClick(route)}>
      <div className="card-content">
        <h3>{route.title}</h3>
        <p className="card-desc">{route.description}</p>
      </div>
      <div className="card-action">
        <span>Посмотреть доступные маршруты</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};
