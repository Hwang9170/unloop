export interface EmotionData {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  trust: number;
  disgust: number;
  anticipation: number;
}

export interface GoalData {
  high: string;
  sub: string[];
  completion?: number;
  priority?: string;
}

export interface CognitiveData {
  tone: string;
  causal_sentences: number;
  complexity_score: number;
  reflection_depth: number;
}

export interface RelationData {
  main_person: string;
  emotion: string;
  interaction_type: string;
  closeness_level: number;
}

export interface TemporalData {
  time: string;
  weekday: string;
  season?: string;
  energy_level: number;
}

export interface IdentityData {
  roles: string[];
  adjectives: string[];
  core_values: string[];
  self_perception: number;
}

export interface GrowthData {
  reflection: number;
  stability: number;
  learning_mentions: number;
  challenge_response: string;
}

export interface MetaData {
  word_count: number;
  platform: string;
  writing_duration?: number;
  mood_consistency: number;
}

export interface InsightData {
  emotion: EmotionData;
  goal: GoalData;
  cognitive: CognitiveData;
  relation: RelationData;
  temporal: TemporalData;
  identity: IdentityData;
  growth: GrowthData;
  meta: MetaData;
}

export type SectionType = 'emotion' | 'goal' | 'cognitive' | 'relation' | 'temporal' | 'identity' | 'growth' | 'meta';

export interface DiaryEntry {
  id: string;
  content: string;
  date: string;
  insights?: InsightData;
}