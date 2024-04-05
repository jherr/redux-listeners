import type { Pokemon } from "../types";

export async function pokemonSearch(search?: string) {
  const res = await fetch("http://localhost:3333/api");
  const pokemon = (await res.json()) as Pokemon[];

  return {
    props: {
      pokemon: pokemon
        .filter(({ name }) =>
          name.toLowerCase().includes(search?.toLowerCase() ?? "")
        )
        .slice(0, 20),
    },
  };
}

export async function getPokemonDetail(id: number) {
  const res = await fetch(`http://localhost:3333/api/${id}`);
  const pokemon = (await res.json()) as Pokemon;

  return {
    props: {
      pokemon: pokemon,
    },
  };
}
