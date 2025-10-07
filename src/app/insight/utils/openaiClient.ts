import { InsightData } from '@/types/insightTypes';

const SYSTEM_PROMPT = `
당신은 일기 내용을 분석하여 8개 영역의 인사이트를 추출하는 전문가입니다.
다음 형태의 JSON을 정확히 반환해주세요:

{
  "emotion": {
    "joy": 0.0-1.0,
    "sadness": 0.0-1.0,
    "anger": 0.0-1.0,
    "fear": 0.0-1.0,
    "surprise": 0.0-1.0,
    "trust": 0.0-1.0,
    "disgust": 0.0-1.0,
    "anticipation": 0.0-1.0
  },
  "goal": {
    "high": "최상위 목표",
    "sub": ["하위목표1", "하위목표2"],
    "completion": 0.0-1.0,
    "priority": "high/medium/low"
  },
  "cognitive": {
    "tone": "긍정/부정/중립",
    "causal_sentences": 숫자,
    "complexity_score": 0.0-1.0,
    "reflection_depth": 0.0-1.0
  },
  "relation": {
    "main_person": "주요인물",
    "emotion": "관계감정",
    "interaction_type": "소통방식",
    "closeness_level": 0.0-1.0
  },
  "temporal": {
    "time": "시간대",
    "weekday": "요일",
    "season": "계절",
    "energy_level": 0.0-1.0
  },
  "identity": {
    "roles": ["역할1", "역할2"],
    "adjectives": ["형용사1", "형용사2"],
    "core_values": ["가치1", "가치2"],
    "self_perception": 0.0-1.0
  },
  "growth": {
    "reflection": 0.0-1.0,
    "stability": 0.0-1.0,
    "learning_mentions": 숫자,
    "challenge_response": "대응방식"
  },
  "meta": {
    "word_count": 숫자,
    "platform": "추정플랫폼",
    "writing_duration": 분,
    "mood_consistency": 0.0-1.0
  }
}

JSON만 반환하고 다른 설명은 포함하지 마세요.
`;

export async function analyzeDiaryEntry(
  diaryText: string,
  apiKey: string
): Promise<InsightData> {
  if (!apiKey) {
    throw new Error('API Key가 필요합니다.');
  }

  if (!diaryText.trim()) {
    throw new Error('일기 내용을 입력해주세요.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: diaryText,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
        `API 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('API 응답에서 콘텐츠를 찾을 수 없습니다.');
    }

    return parseInsightData(content);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('분석 중 알 수 없는 오류가 발생했습니다.');
  }
}

function parseInsightData(content: string): InsightData {
  try {
    // JSON 부분만 추출
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('응답에서 JSON을 찾을 수 없습니다.');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // 기본값으로 누락된 필드 보완
    const defaultInsight: InsightData = {
      emotion: {
        joy: 0,
        sadness: 0,
        anger: 0,
        fear: 0,
        surprise: 0,
        trust: 0,
        disgust: 0,
        anticipation: 0,
        ...parsed.emotion,
      },
      goal: {
        high: '',
        sub: [],
        completion: 0,
        priority: 'medium',
        ...parsed.goal,
      },
      cognitive: {
        tone: '중립',
        causal_sentences: 0,
        complexity_score: 0,
        reflection_depth: 0,
        ...parsed.cognitive,
      },
      relation: {
        main_person: '',
        emotion: '',
        interaction_type: '',
        closeness_level: 0,
        ...parsed.relation,
      },
      temporal: {
        time: '',
        weekday: '',
        season: '',
        energy_level: 0,
        ...parsed.temporal,
      },
      identity: {
        roles: [],
        adjectives: [],
        core_values: [],
        self_perception: 0,
        ...parsed.identity,
      },
      growth: {
        reflection: 0,
        stability: 0,
        learning_mentions: 0,
        challenge_response: '',
        ...parsed.growth,
      },
      meta: {
        word_count: 0,
        platform: '',
        writing_duration: 0,
        mood_consistency: 0,
        ...parsed.meta,
      },
    };

    return defaultInsight;
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    throw new Error('응답 데이터를 파싱할 수 없습니다.');
  }
}