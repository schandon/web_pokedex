import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mb-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Pokédex Web</h1>
          <p className="text-blue-100 text-lg">
            Gerencie sua coleção de Pokémons
          </p>
        </div>
      </div>
    </header>
  );
};