export type PokemonID = string;

export interface PokemonResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Pokemon[];
}

export interface Pokemon {
    name: string;
    url:  string;
}

export interface PokemonGame{
    name:string;
    image:string;
    id:number;
    idUnique: PokemonID 
}