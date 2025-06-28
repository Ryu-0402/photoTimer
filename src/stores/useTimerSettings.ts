import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

type TimerSettingsState = {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

export const useTimerSettings = create<TimerSettingsState>()(
  persist(
    (set) => ({
      imageUri: null,
      setImageUri: (uri) => set({ imageUri: uri }),
      selectedColor: '#00FF00',
      setSelectedColor: (color) => set({ selectedColor: color }),
    }),
    {
      name: 'timer-settings-storage',
      storage: createJSONStorage<TimerSettingsState>(() => AsyncStorage), 
    }
  )
);