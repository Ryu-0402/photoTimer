import { create } from "zustand";

type TimerSettingsState = {
    imageUri: string | null;
    setImageUri: (uri: string | null) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
};

export const useTimerSettings = create<TimerSettingsState>((set) => ({
    imageUri: null,
    setImageUri: (uri) => set({ imageUri: uri }),
    selectedColor: '#FFFFFF',
    setSelectedColor: (color) => set({ selectedColor: color }),
}));