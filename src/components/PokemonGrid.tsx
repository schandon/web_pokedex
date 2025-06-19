import React from 'react';
import { Pokemon } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemons: Pokemon[];
  loading?: boolean;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="pokemon-card p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">Nenhum Pokémon encontrado</div>
        <p className="text-gray-400">Tente ajustar os filtros ou adicione novos Pokémons</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};