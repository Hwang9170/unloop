import { SupportedLanguage } from '@/types/language';
import { InsightData } from '@/types/insightTypes';

export function buildSystemPrompt(language: SupportedLanguage): string {
  const languageInstruction = language === 'ko'
    ? '모든 텍스트 값을 자연스러운 한국어로 작성하세요.'
    : 'Write every text value in natural English.';

  return `
You are an expert analyst who extracts 8 categories of insights from diary entries.
The user's diary may be written in Korean or English. Regardless of the input language,
follow the requested output language. ${languageInstruction}
Return JSON that follows this schema exactly:

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
    "high": "Main goal",
    "sub": ["Sub goal 1", "Sub goal 2"],
    "completion": 0.0-1.0,
    "priority": "high/medium/low"
  },
  "cognitive": {
    "tone": "positive/negative/neutral",
    "causal_sentences": integer,
    "complexity_score": 0.0-1.0,
    "reflection_depth": 0.0-1.0
  },
  "relation": {
    "main_person": "Main person",
    "emotion": "Relationship emotion",
    "interaction_type": "Interaction type",
    "closeness_level": 0.0-1.0
  },
  "temporal": {
    "time": "Time of day",
    "weekday": "Weekday",
    "season": "Season",
    "energy_level": 0.0-1.0
  },
  "identity": {
    "roles": ["Role 1", "Role 2"],
    "adjectives": ["Adjective 1", "Adjective 2"],
    "core_values": ["Value 1", "Value 2"],
    "self_perception": 0.0-1.0
  },
  "growth": {
    "reflection": 0.0-1.0,
    "stability": 0.0-1.0,
    "learning_mentions": integer,
    "challenge_response": "Response style"
  },
  "meta": {
    "word_count": integer,
    "platform": "Writing platform",
    "writing_duration": minutes,
    "mood_consistency": 0.0-1.0
  }
}

Return ONLY valid JSON without any extra explanation or commentary.
`;
}

export function parseOpenAIInsight(content: string): InsightData {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('응답에서 JSON을 찾을 수 없습니다.');
    }

    const parsed = JSON.parse(jsonMatch[0]);

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
