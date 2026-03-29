import React, { useEffect, useRef } from 'react';
import { RouteData } from '../../types';

interface MapScreenProps {
  route: RouteData;
  onBack: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ route, onBack }) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let dgScript = document.getElementById('dg-api-script') as HTMLScriptElement;
    if (!dgScript) {
      dgScript = document.createElement('script');
      dgScript.id = 'dg-api-script';
      dgScript.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
      document.head.appendChild(dgScript);
    }

    let isMounted = true;
    let checkInterval = setInterval(() => {
      const w = window as any;
      if (w.DG) {
        clearInterval(checkInterval);
        w.DG.then(() => {
          if (isMounted && !mapRef.current) {
            const container = document.getElementById('map-render-target');
            if (container) container.innerHTML = '';
            
            mapRef.current = w.DG.map('map-render-target', {
              center: route.coordinates,
              zoom: 14,
              fullscreenControl: false
            });
            w.DG.marker(route.coordinates)
              .addTo(mapRef.current)
              .bindPopup('Зона начала маршрута: Эммануэльевское урочище')
              .openPopup();
          }
        });
      }
    }, 100);

    return () => {
      isMounted = false;
      clearInterval(checkInterval);
      if (mapRef.current && typeof mapRef.current.remove === 'function') {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [route]);

  return (
    <div className="route-screen">
      <header className="route-header">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Назад к списку</span>
        </button>
        <h2>{route.title}</h2>
      </header>
      
      <div className="route-content">
        <div className="route-content-top">
          <div className="route-description card animate-up">
            <h3>Краткое описание</h3>
            <p className="large-text">{route.description}</p>
          </div>
          
          <div className="map-card card animate-up-delay">
            <div className="map-wrapper">
              <div id="map-render-target" style={{ width: '100%', height: '350px' }}></div>
            </div>
            <div className="map-action-footer">
              <p>Хотите посмотреть подробный маршрут, составленный врачом?</p>
              <a href={route.link} target="_blank" rel="noopener noreferrer" className="external-btn">
                Перейти в 2ГИС
              </a>
            </div>
          </div>
        </div>

        <div className="route-rehab card animate-up-delay-2">
          <h3>Реабилитационный потенциал</h3>
          <p style={{whiteSpace: 'pre-line'}}>{route.fullDescription}</p>
        </div>
      </div>
    </div>
  );
};
