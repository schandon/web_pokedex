import React from 'react';
import { Plus, Tag } from 'lucide-react';

interface ActionButtonsProps {
  onAddPokemon: () => void;
  onAddType: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddPokemon,
  onAddType,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button
        onClick={onAddPokemon}
        className="btn-primary flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Adicionar Pokémon
      </button>
      
      <button
        onClick={onAddType}
        className="btn-secondary flex items-center justify-center gap-2"
      >
        <Tag className="w-5 h-5" />
        Adicionar Tipo
      </button>
    </div>
  );
};