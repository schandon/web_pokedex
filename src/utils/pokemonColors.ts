export const getPokemonTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    fogo: 'bg-red-500',
    agua: 'bg-blue-500',
    grama: 'bg-green-500',
    eletrico: 'bg-yellow-500',
    psiquico: 'bg-purple-500',
    gelo: 'bg-cyan-400',
    dragao: 'bg-indigo-600',
    sombrio: 'bg-gray-800',
    fada: 'bg-pink-400',
    normal: 'bg-gray-400',
    lutador: 'bg-red-700',
    veneno: 'bg-purple-600',
    terra: 'bg-yellow-600',
    voador: 'bg-blue-300',
    inseto: 'bg-green-400',
    pedra: 'bg-yellow-800',
    fantasma: 'bg-purple-700',
    aco: 'bg-gray-500',
  };

  return colors[type.toLowerCase()] || 'bg-gray-400';
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};