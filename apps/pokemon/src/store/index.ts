import {
  configureStore,
  createSlice,
  createListenerMiddleware,
  addListener,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { Pokemon } from "../types";

/*
We are purposefully not using RTK Query here to demonstrate how to use the listener middleware with a more traditional Redux setup.
*/

interface PokemonState {
  search: string;
  pokemon: Pokemon[];
}

const initialState: PokemonState = {
  search: "",
  pokemon: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    searchUpdated: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    pokemonUpdated: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemon = action.payload;
    },
  },
});

export const { searchUpdated, pokemonUpdated } = pokemonSlice.actions;

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// listenerMiddleware.startListening.withTypes<
//   RootState,
//   AppDispatch
// >()({
//   predicate: (action, currentState, previousState) => {
//     return currentState.counter.cart !== previousState.counter.cart;
//   },
//   effect: (action, listenerApi) => {
//     const total = listenerApi
//       .getState()
//       .counter.cart.reduce(
//         (acc: number, product: Product) => acc + product.price,
//         0
//       );
//     listenerApi.dispatch(totalUpdated(total));
//   },
// });

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useSearch = () => useAppSelector((state) => state.pokemon.search);
export const usePokemon = () =>
  useAppSelector((state) => state.pokemon.pokemon);
