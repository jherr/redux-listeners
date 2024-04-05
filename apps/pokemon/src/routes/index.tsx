import React, { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

import SearchGrid from "../components/SearchGrid";

import { usePokemon, useSearch, pokemonUpdated, store } from "../store";
import { pokemonSearch } from "../api/pokemon";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    store.dispatch(pokemonUpdated(await pokemonSearch("")));
  },
});

export default function Index() {
  const searchInputValue = useSearch();
  const pokemon = usePokemon();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async function runSearch() {
  //     dispatch(pokemonUpdated(await pokemonSearch(searchInputValue)));
  //   })();
  // }, [searchInputValue]);

  return <SearchGrid pokemon={pokemon || []} />;
}
