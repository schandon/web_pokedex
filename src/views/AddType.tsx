import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddType() {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://192.168.1.171:3003/type');
        const types = response.data;
        const maxId =
          types.length > 0 ? Math.max(...types.map((p: any) => p.id)) : 0;
        setId(maxId + 1);
        setTypes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os Tipos');
        setLoading(false);
      }
    };
    fetchTypes();
  }, [id]);

  const handleBackHomePage = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name) {
      setError('Por favor, preencha todos os campos obrigatórios (Nome).');
      return;
    }
    try {
      const newTypes = {
        id,
        name,
      };
      const response = await axios.post(
        'http://192.168.1.171:3003/type',
        newTypes
      );
      alert('Tipo adicionado com sucesso!');
      navigate('/', { state: { newTypes: response.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao adicionar Tipo');
    }
  };

  // Função para deletar um Tipo
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://192.168.1.171:3003/type/${id}`);
      setTypes(types.filter((types: any) => types.id !== id));
      alert('Tipo deletado com sucesso!');
    } catch (err) {
      alert('Erro ao deletar Tipo');
    }
  };

  // Função para editar um Tipo
  const handleEdit = async (type: any) => {
    const newName = prompt('Novo nome:', type.name);
    if (newName) {
      try {
        const updatedType = {
          name: newName,
        };
        await axios.put(
          `http://192.168.1.171:3003/type/${type.id}`,
          updatedType
        );
        setTypes(
          types.map((p: any) =>
            p.id === type.id ? { ...p, ...updatedType } : p
          )
        );
        setTypes(
          types.map((p: any) =>
            p.id === type.id ? { ...p, ...updatedType } : p
          )
        );
        alert('Tipo atualizado com sucesso!');
      } catch (err) {
        alert('Erro ao atualizar Tipo');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-600 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="font-Roboto font-bold text-2xl text-center text-gray-800 mb-8">
          Pokedex - Schandon
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="p-6 text-center space-y-4">
            <div className="flex flex-col space-y-4 items-center">
              <button
                className="max-w-md py-3 px-4 font-roboto rounded-md text-blue bg-gray-400 hover:bg-blue-500"
                onClick={handleBackHomePage}
              >
                Voltar para Pagina inicial
              </button>
            </div>
            <div>
              <label className="text-left block text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="number"
                value={id ?? ''}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="ID gerado automaticamente"
              />
              <form
                onSubmit={handleSubmit}
                className="flex gap-4 justify-center py-4"
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-sm flex-1 p-2 text-lg border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Adicione aqui um tipo novo"
                />

                <button
                  className="max-w-md py-3 px-4 font-roboto rounded-md text-blue bg-gray-400 hover:bg-blue-500"
                  type="submit"
                >
                  Salvar
                </button>
              </form>
            </div>
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
                  ) : types.length > 0 ? (
                    types.map((types: any) => (
                      <tr
                        key={types.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-2">
                          {types.id}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {types.name}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="max-w-md py-1 px-2 font-roboto rounded-md text-blue-600 bg-blue-200"
                              onClick={() => handleEdit(types)}
                            >
                              Editar
                            </button>
                            <button
                              className="max-w-md py-1 px-2 font-roboto rounded-md text-white bg-red-400"
                              onClick={() => handleDelete(types.id)}
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
                        Nenhum Tipo encontrado
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
