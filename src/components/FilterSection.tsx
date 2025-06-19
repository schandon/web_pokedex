import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterSectionProps {
  nameFilter: string;
  typeFilter: string;
  availableTypes: string[];
  onNameFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  nameFilter,
  typeFilter,
  availableTypes,
  onNameFilterChange,
  onTypeFilterChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Pokémon
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="name-filter"
              type="text"
              placeholder="Digite o nome do Pokémon..."
              value={nameFilter}
              onChange={(e) => onNameFilterChange(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo do Pokémon
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="input-field"
          >
            <option value="">Todos os tipos</option>
            {availableTypes.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};