import { InsightData } from '@/types/insightTypes';

export async function analyzeDiaryEntry(
  diaryText: string
): Promise<InsightData> {
  if (!diaryText.trim()) {
    throw new Error('일기 내용을 입력해주세요.');
  }

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diaryText }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || '인사이트 분석 중 오류가 발생했습니다.');
    }

    const data = await response.json();
    return data.insights as InsightData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('분석 중 알 수 없는 오류가 발생했습니다.');
  }
}
