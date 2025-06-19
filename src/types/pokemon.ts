export interface Pokemon {
  id: number;
  nome: string;
  tipo_primario: string;
  tipo_secundario?: string;
}

export interface PokemonType {
  id: number;
  nome: string;
  cor?: string;
}

export interface ApiResponse<T> {
  data: T[];
  total?: number;
}