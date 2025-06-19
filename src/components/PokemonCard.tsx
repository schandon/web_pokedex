import React from 'react';
import { Pokemon } from '../types/pokemon';
import { getPokemonTypeColor, formatPokemonId } from '../utils/pokemonColors';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 capitalize">
          {pokemon.nome}
        </h3>
        <span className="text-sm font-medium text-gray-500">
          {formatPokemonId(pokemon.id)}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-600 block mb-1">Tipo Primário:</span>
          <span className={`pokemon-type ${getPokemonTypeColor(pokemon.tipo_primario)} capitalize`}>
            {pokemon.tipo_primario}
          </span>
        </div>
        
        {pokemon.tipo_secundario && (
          <div>
            <span className="text-sm text-gray-600 block mb-1">Tipo Secundário:</span>
            <span className={`pokemon-type ${getPokemonTypeColor(pokemon.tipo_secundario)} capitalize`}>
              {pokemon.tipo_secundario}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};