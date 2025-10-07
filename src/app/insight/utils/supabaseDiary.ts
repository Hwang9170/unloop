'use client';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InsightData } from '@/types/insightTypes';

export interface DiaryRow {
  id: string;
  user_id: string;
  text: string;
  summary?: string | null;
  emotion?: string | null;
  keywords?: InsightData | null;
  insight?: string | null;
  created_at?: string;
}

export async function saveDiaryEntry(
  supabase: SupabaseClient,
  entry: DiaryRow,
): Promise<void> {
  const {
    id,
    user_id,
    text,
    summary = null,
    emotion = null,
    keywords = null,
    insight = null,
    created_at,
  } = entry;

  const payload: Record<string, unknown> = {
    id,
    user_id,
    text,
    summary,
    emotion,
    keywords,
    insight,
  };

  if (created_at) {
    payload.created_at = created_at;
  }

  const { error } = await supabase
    .from('diary_entries')
    .upsert(payload, { onConflict: 'id' });

  if (error) {
    throw new Error(`일기 저장 실패: ${error.message}`);
  }
}

export async function fetchDiaryEntries(
  supabase: SupabaseClient,
  userId: string,
): Promise<DiaryRow[]> {
  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`일기 불러오기 실패: ${error.message}`);
  }

  return (data ?? []) as DiaryRow[];
}
