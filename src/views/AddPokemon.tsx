import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddPokemon() {
  const [id, setId] = useState<number | null>(null); // Store the next ID
  const [name, setName] = useState('');
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Added for fetching pokemon
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('http://192.168.1.171:3003/pokemon');
        const pokemons = response.data;
        const maxId =
          pokemons.length > 0 ? Math.max(...pokemons.map((p: any) => p.id)) : 0;
        setId(maxId + 1);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar IDs dos pokemon');
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name || !type1) {
      setError(
        'Por favor, preencha todos os campos obrigatórios (Nome, Tipo 1).'
      );
      return;
    }
    try {
      const newPokemon = {
        id, // Use the pre-set ID
        name,
        fk_tipo_primario: type1,
        fk_tipo_secundario: type2 || null,
      };
      const response = await axios.post(
        'http://192.168.1.171:3003/pokemon',
        newPokemon
      );
      alert('pokemon adicionado com sucesso!');
      navigate('/', { state: { newPokemon: response.data } }); // Pass new pokemon data
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao adicionar Pokemon');
    }
  };

  const handleBackHomePage = () => {
    navigate('/');
  };

  const handleAddType = () => {
    navigate('/type');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-600 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="font-Roboto font-bold text-2xl text-center text-gray-800 mb-8">
          Adicionar Novo pokemon
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">Carregando ID...</div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="number"
                value={id ?? ''}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="ID gerado automaticamente"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Digite o nome do pokemon"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo Primário
              </label>
              <select
                value={type1}
                onChange={(e) => setType1(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Selecione o tipo primário</option>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo Secundário (opcional)
              </label>
              <select
                value={type2}
                onChange={(e) => setType2(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Nenhum</option>
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
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="py-2 px-4 font-roboto rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                Adicionar pokemon
              </button>
              <button
                type="button"
                onClick={handleBackHomePage}
                className="py-2 px-4 font-roboto rounded-md text-white bg-red-500 hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 flex flex-col space-y-4 items-center">
          <button
            className="max-w-md py-3 px-4 font-roboto rounded-md text-blue bg-gray-400 hover:bg-blue-500"
            onClick={handleAddType}
          >
            Gerenciar Tipo
          </button>
        </div>
      </div>
    </div>
  );
}
