import React, { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import SearchGrid from "../components/SearchGrid";
import type { Pokemon } from "../types";
import { pokemonSearch } from "../api/pokemon";

type PokemonSearch = {
  search?: string;
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>): PokemonSearch => {
    return {
      search: search.search as string,
    };
  },
});

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const onRunSearch = async (search: string) => {
    setPokemon((await pokemonSearch(search ?? "")).props.pokemon);
  };

  const { search } = Route.useSearch();

  useEffect(() => {
    onRunSearch(search ?? "");
  }, [search]);

  const navigate = useNavigate();

  const onSearch = (search: string) => {
    onRunSearch(search);
    navigate({ to: `/`, search: { search }, replace: true });
  };

  return (
    <SearchGrid
      onSearch={onSearch}
      pokemon={pokemon}
      initialSearch={search ?? ""}
    />
  );
}
