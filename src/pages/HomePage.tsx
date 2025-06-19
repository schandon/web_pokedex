import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { ActionButtons } from '../components/ActionButtons';
import { FilterSection } from '../components/FilterSection';
import { PokemonGrid } from '../components/PokemonGrid';
import { Pokemon, PokemonType } from '../types/pokemon';
import { ApiService } from '../services/api';

export const HomePage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const loadPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const filters: { nome?: string; tipo?: string } = {};
      
      if (nameFilter.trim()) filters.nome = nameFilter.trim();
      if (typeFilter) filters.tipo = typeFilter;
      
      const response = await ApiService.getPokemons(filters);
      setPokemons(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error('Erro ao carregar Pokémons:', error);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }, [nameFilter, typeFilter]);

  const loadTypes = useCallback(async () => {
    try {
      const response = await ApiService.getTypes();
      setTypes(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tipos:', error);
      setTypes([]);
    }
  }, []);

  useEffect(() => {
    loadTypes();
  }, [loadTypes]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadPokemons();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [loadPokemons]);

  const handleAddPokemon = () => {
    // TODO: Implementar modal/página para adicionar Pokémon
    alert('Funcionalidade de adicionar Pokémon será implementada em breve!');
  };

  const handleAddType = () => {
    // TODO: Implementar modal/página para adicionar tipo
    alert('Funcionalidade de adicionar tipo será implementada em breve!');
  };

  const availableTypes = types.map(type => type.nome);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pb-8">
        <ActionButtons
          onAddPokemon={handleAddPokemon}
          onAddType={handleAddType}
        />
        
        <FilterSection
          nameFilter={nameFilter}
          typeFilter={typeFilter}
          availableTypes={availableTypes}
          onNameFilterChange={setNameFilter}
          onTypeFilterChange={setTypeFilter}
        />
        
        <PokemonGrid pokemons={pokemons} loading={loading} />
      </div>
    </div>
  );
};