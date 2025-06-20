import { useState, useEffect } from 'react';
import axios from 'axios';

export function HomePage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os dados do backend
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('http://192.168.1.171:3003/pokemon');
        console.log('API Response:', response.data); // Debug: Log the API response
        setAllPokemons(response.data);
        setPokemons(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os Pokémon');
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  // Filter Pokémon by name
  const handleFilterName = (name: string) => {
    setFilterName(name);
    let filteredPokemons = allPokemons;

    // Apply name filter
    if (name.trim() !== '') {
      filteredPokemons = filteredPokemons.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Apply type filter if active
    if (filterType.trim() !== '') {
      filteredPokemons = filteredPokemons.filter(
        (pokemon: any) =>
          (pokemon.fk_tipo_primario &&
            pokemon.fk_tipo_primario.toLowerCase() ===
              filterType.toLowerCase()) ||
          (pokemon.fk_tipo_secundario &&
            pokemon.fk_tipo_secundario.toLowerCase() ===
              filterType.toLowerCase())
      );
    }

    setPokemons(filteredPokemons);
  };

  // Filter Pokémon by type
  const handleFilterType = (type: string) => {
    setFilterType(type);
    let filteredPokemons = allPokemons;

    // Apply name filter if active
    if (filterName.trim() !== '') {
      filteredPokemons = filteredPokemons.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    // Apply type filter
    if (type.trim() === '') {
      setPokemons(filteredPokemons); // Show all Pokémon (or name-filtered) if type is "Todos os tipos"
    } else {
      filteredPokemons = filteredPokemons.filter(
        (pokemon: any) =>
          (pokemon.fk_tipo_primario &&
            pokemon.fk_tipo_primario.toLowerCase() === type.toLowerCase()) ||
          (pokemon.fk_tipo_secundario &&
            pokemon.fk_tipo_secundario.toLowerCase() === type.toLowerCase())
      );
      setPokemons(filteredPokemons);
    }
  };

  // Função para deletar um Pokémon
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://192.168.1.171:3003/pokemon/${id}`);
      setAllPokemons(allPokemons.filter((pokemon: any) => pokemon.id !== id));
      setPokemons(pokemons.filter((pokemon: any) => pokemon.id !== id));
      alert('Pokémon deletado com sucesso!');
    } catch (err) {
      alert('Erro ao deletar Pokémon');
    }
  };

  // Função para editar um Pokémon
  const handleEdit = async (pokemon: any) => {
    const newName = prompt('Novo nome:', pokemon.name);
    const newType1 = prompt('Novo tipo 1:', pokemon.fk_tipo_primario);
    const newType2 = prompt(
      'Novo tipo 2 (opcional):',
      pokemon.fk_tipo_secundario || ''
    );
    if (newName && newType1) {
      try {
        const updatedPokemon = {
          name: newName,
          fk_tipo_primario: newType1,
          fk_tipo_secundario: newType2 || null,
        };
        await axios.put(
          `http://192.168.1.171:3003/pokemon/${pokemon.id}`,
          updatedPokemon
        );
        setAllPokemons(
          allPokemons.map((p: any) =>
            p.id === pokemon.id ? { ...p, ...updatedPokemon } : p
          )
        );
        setPokemons(
          pokemons.map((p: any) =>
            p.id === pokemon.id ? { ...p, ...updatedPokemon } : p
          )
        );
        alert('Pokémon atualizado com sucesso!');
      } catch (err) {
        alert('Erro ao atualizar Pokémon');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-600 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-7xl">
        <h1 className="font-Roboto font-bold text-2xl text-center text-gray-800 mb-8">
          Pokedex - Informations
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="p-6 text-center space-y-4">
            <div className="flex flex-col space-y-4 items-center">
              <button className="max-w-md py-3 px-4 font-roboto rounded-md text-blue bg-gray-400">
                Adicionar Pokemon
              </button>
              <button className="max-w-md py-3 px-4 font-roboto rounded-md text-blue bg-gray-400 hover:bg-blue-500">
                Gerenciar Tipo
              </button>
            </div>
            <div className="flex gap-4 justify-center py-4">
              <input
                className="max-w-sm flex-1 p-2 text-lg border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Filtre aqui a lista de Pokemons"
                value={filterName}
                onChange={(e) => handleFilterName(e.target.value)}
              />
              <select
                className="max-w-sm flex-1 p-2 text-lg border rounded-md"
                value={filterType}
                onChange={(e) => handleFilterType(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="grass">Grass</option>
                <option value="poison">Poison</option>
                <option value="fire">Fire</option>
                <option value="flying">Flying</option>
                <option value="water">Water</option>
                <option value="bug">Bug</option>
                <option value="normal">Normal</option>
                <option value="electric">Electric</option>
                <option value="ground">Ground</option>
                <option value="fairy">Fairy</option>
                <option value="fighting">Fighting</option>
                <option value="psychic">Psychic</option>
                <option value="rock">Rock</option>
                <option value="steel">Steel</option>
                <option value="ice">Ice</option>
                <option value="ghost">Ghost</option>
                <option value="dragon">Dragon</option>
              </select>
            </div>
            {/* Tabela */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-400">
                    <th className="border border-gray-300 p-2 text-left">
                      Código
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Nome
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Tipo Primário
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      Tipo Secundário
                    </th>
                    <th className="border border-gray-300 p-2 text-center">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="border border-gray-300 p-2 text-center"
                      >
                        Carregando...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="border border-gray-300 p-2 text-center"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : pokemons.length > 0 ? (
                    pokemons.map((pokemon: any) => (
                      <tr
                        key={pokemon.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-2">
                          {pokemon.id}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {pokemon.name}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {pokemon.fk_tipo_primario}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {pokemon.fk_tipo_secundario || '-'}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="max-w-md py-1 px-2 font-roboto rounded-md text-blue-600 bg-blue-200"
                              onClick={() => handleEdit(pokemon)}
                            >
                              Editar
                            </button>
                            <button
                              className="max-w-md py-1 px-2 font-roboto rounded-md text-white bg-red-400"
                              onClick={() => handleDelete(pokemon.id)}
                            >
                              Deletar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="border border-gray-300 p-2 text-center"
                      >
                        Nenhum Pokémon encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
