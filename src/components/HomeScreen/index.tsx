import React from 'react';
import { RouteData } from '../../types';
import { DiseaseCard } from '../DiseaseCard';

interface HomeScreenProps {
  routes: RouteData[];
  onSelectRoute: (route: RouteData) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ routes, onSelectRoute }) => {
  return (
    <div className="home-screen">
      <header className="main-header">
        <h1>Дыши Легко</h1>
        <p>Медицинская реабилитация в Эммануэльевском урочище</p>
      </header>
      
      <div className="cards-list animate-up-delay">
        {routes.map(route => (
          <DiseaseCard 
            key={route.id} 
            route={route} 
            onClick={onSelectRoute} 
          />
        ))}
      </div>
    </div>
  );
};
