import { create } from "zustand";

const initialState = {
  date: new Date().toISOString().split("T")[0],
  mood: "",
  intensity: [5],
  description: "",
  emotion_trigger: "",
};

export const useEmotionStore = create((set) => ({
  novaEmocao: initialState,
  setNovaEmocao: (data) =>
    set((state) => ({
      novaEmocao: { ...state.novaEmocao, ...data },
    })),
  resetEmocao: () => set({ novaEmocao: initialState }),
}));
