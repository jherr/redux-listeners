import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

import { Pokemon } from "../types";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Link to="/pokemon/$id" params={{ id: pokemon.id.toString() }}>
      <div className="rounded-xl max-h-96">
        <img
          src={`http://localhost:3333/assets/${pokemon.name.toLowerCase()}.jpg`}
          alt={pokemon.name}
          className="w-full object-cover rounded-t-xl max-h-48"
        />
        <h3 className="text-2xl border-b-2 border-l-2 border-r-2 rounded-b-xl px-4 py-2">
          {pokemon.name}
        </h3>
      </div>
    </Link>
  );
};

export default function SearchGrid({
  pokemon,
  onSearch,
  initialSearch,
}: {
  pokemon: Pokemon[];
  onSearch?: (search: string) => void;
  initialSearch?: string;
}) {
  const [search, setSearch] = useState(initialSearch ?? "");

  const onDoSearch = () => {
    onSearch?.(search);
  };

  return (
    <>
      <div className="flex">
        <input
          placeholder="Search for a Pokemon"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          onKeyUp={(evt) => {
            if (evt.key === "Enter") {
              onDoSearch();
            }
          }}
          className="bg-white text-black border-gray-500 p-2 m-2 rounded-md text-xl w-full"
        />
        <button
          onClick={onDoSearch}
          className="bg-blue-500 text-white px-8 py-2 m-2 rounded-full"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap">
        {pokemon.map((pokemon) => (
          <div key={pokemon.id} className="w-1/5 p-2">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
    </>
  );
}
