import { create } from "zustand";

const initialState = {
  date: new Date().toISOString().split("T")[0],
  title: "",
  dream_description: "",
  emotions_list: "",
  symbols_list: "",
  clarity: "",
  category: "",
};

export const useDreamStore = create((set) => ({
  novoSonho: initialState,
  setNovoSonho: (data) =>
    set((state) => ({
      novoSonho: { ...state.novoSonho, ...data },
    })),
  resetSonho: () => set({ novoSonho: initialState }),
}));
