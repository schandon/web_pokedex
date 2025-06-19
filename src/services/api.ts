const API_BASE_URL = 'http://192.168.1.171:3003';

export class ApiService {
  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // Pokémons
  static async getPokemons(filters?: { nome?: string; tipo?: string }) {
    let endpoint = '/pokemons';
    const params = new URLSearchParams();
    
    if (filters?.nome) params.append('nome', filters.nome);
    if (filters?.tipo) params.append('tipo', filters.tipo);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    return this.request(endpoint);
  }

  static async createPokemon(pokemon: Omit<Pokemon, 'id'>) {
    return this.request('/pokemons', {
      method: 'POST',
      body: JSON.stringify(pokemon),
    });
  }

  static async updatePokemon(id: number, pokemon: Partial<Pokemon>) {
    return this.request(`/pokemons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pokemon),
    });
  }

  static async deletePokemon(id: number) {
    return this.request(`/pokemons/${id}`, {
      method: 'DELETE',
    });
  }

  // Tipos
  static async getTypes() {
    return this.request('/tipos');
  }

  static async createType(type: Omit<PokemonType, 'id'>) {
    return this.request('/tipos', {
      method: 'POST',
      body: JSON.stringify(type),
    });
  }

  static async updateType(id: number, type: Partial<PokemonType>) {
    return this.request(`/tipos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(type),
    });
  }

  static async deleteType(id: number) {
    return this.request(`/tipos/${id}`, {
      method: 'DELETE',
    });
  }
}