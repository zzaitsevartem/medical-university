import React, { useState, useEffect } from 'react';
import { ROUTES } from './data';
import { RouteData } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeScreen } from './components/HomeScreen';
import { MapScreen } from './components/MapScreen';
import './index.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="app-container flex-center">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="app-container">
      {selectedRoute ? (
        <MapScreen 
          route={selectedRoute} 
          onBack={() => setSelectedRoute(null)} 
        />
      ) : (
        <HomeScreen 
          routes={ROUTES} 
          onSelectRoute={setSelectedRoute} 
        />
      )}
    </div>
  );
};

export default App;
