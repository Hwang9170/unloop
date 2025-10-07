import { create } from 'zustand';
import { InsightData, SectionType, DiaryEntry } from '@/types/insightTypes';

interface InsightState {
  currentEntry: DiaryEntry | null;
  insights: InsightData | null;
  activeSection: SectionType | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentEntry: (entry: DiaryEntry) => void;
  setInsights: (insights: InsightData) => void;
  setActiveSection: (section: SectionType | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearInsights: () => void;
}

export const useInsightStore = create<InsightState>((set) => ({
  currentEntry: null,
  insights: null,
  activeSection: null,
  isLoading: false,
  error: null,

  setCurrentEntry: (entry) => set({ currentEntry: entry }),
  setInsights: (insights) => set({ insights }),
  setActiveSection: (section) => set({ activeSection: section }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearInsights: () => set({
    insights: null,
    currentEntry: null,
    activeSection: null,
    error: null
  }),
}));
