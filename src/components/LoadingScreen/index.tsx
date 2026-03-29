import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen animate-fade-in">
      <div className="lung-container">
        <img src="/lung_icon.png" alt="Лёгкие" className="lung-icon" />
      </div>
      <h1 className="fade-in-text">Загрузка...</h1>
    </div>
  );
};
