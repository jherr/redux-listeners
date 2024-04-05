import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import SearchGrid from "../components/SearchGrid";

import type { Pokemon } from "../types";

import { useSearch } from "../store";
import { pokemonSearch } from "../api/pokemon";

export const Route = createFileRoute("/")({
  component: Index,
});

export default function Index() {
  const searchInputValue = useSearch();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    (async function runSearch() {
      setPokemon((await pokemonSearch(searchInputValue)).props.pokemon);
    })();
  }, [searchInputValue]);

  return <SearchGrid pokemon={pokemon} />;
}
