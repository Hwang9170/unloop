import { InsightData, SectionType } from '@/types/insightTypes';

export function getSectionSummary(insights: InsightData, section: SectionType): string {
  switch (section) {
    case 'emotion':
      const topEmotion = Object.entries(insights.emotion)
        .sort(([,a], [,b]) => b - a)[0];
      return `주요 감정: ${getEmotionKorean(topEmotion[0])} (${Math.round(topEmotion[1] * 100)}%)`;

    case 'goal':
      return `목표: ${insights.goal.high} (${Math.round((insights.goal.completion || 0) * 100)}% 달성)`;

    case 'cognitive':
      return `사고 톤: ${insights.cognitive.tone}, 복잡도: ${Math.round(insights.cognitive.complexity_score * 100)}%`;

    case 'relation':
      return `주요 관계: ${insights.relation.main_person} (친밀도: ${Math.round(insights.relation.closeness_level * 100)}%)`;

    case 'temporal':
      return `시간 패턴: ${insights.temporal.weekday} ${insights.temporal.time}, 에너지: ${Math.round(insights.temporal.energy_level * 100)}%`;

    case 'identity':
      return `정체성: ${insights.identity.roles.join(', ')} / ${insights.identity.adjectives.slice(0, 2).join(', ')}`;

    case 'growth':
      return `성장: 반성도 ${Math.round(insights.growth.reflection * 100)}%, 안정성 ${Math.round(insights.growth.stability * 100)}%`;

    case 'meta':
      return `메타 정보: ${insights.meta.word_count}자, ${insights.meta.platform} 플랫폼`;

    default:
      return '';
  }
}

export function getSectionTitle(section: SectionType): string {
  const titles = {
    emotion: '감정 분석',
    goal: '목표 추적',
    cognitive: '사고 패턴',
    relation: '관계 분석',
    temporal: '시간 리듬',
    identity: '정체성',
    growth: '성장 지표',
    meta: '메타 데이터'
  };
  return titles[section];
}

export function getSectionIcon(section: SectionType): string {
  const icons = {
    emotion: '💭',
    goal: '🎯',
    cognitive: '🧠',
    relation: '👥',
    temporal: '⏰',
    identity: '🌟',
    growth: '📈',
    meta: '📊'
  };
  return icons[section];
}

export function getSectionColor(section: SectionType): string {
  const colors = {
    emotion: 'from-pink-500 to-purple-600',
    goal: 'from-blue-500 to-cyan-600',
    cognitive: 'from-green-500 to-teal-600',
    relation: 'from-orange-500 to-red-600',
    temporal: 'from-indigo-500 to-purple-600',
    identity: 'from-yellow-500 to-orange-600',
    growth: 'from-emerald-500 to-green-600',
    meta: 'from-gray-500 to-slate-600'
  };
  return colors[section];
}

function getEmotionKorean(emotion: string): string {
  const emotionMap: Record<string, string> = {
    joy: '기쁨',
    sadness: '슬픔',
    anger: '분노',
    fear: '두려움',
    surprise: '놀라움',
    trust: '신뢰',
    disgust: '혐오',
    anticipation: '기대'
  };
  return emotionMap[emotion] || emotion;
}

export function getMockInsightData(): InsightData {
  return {
    emotion: {
      joy: 0.7,
      sadness: 0.2,
      anger: 0.1,
      fear: 0.1,
      surprise: 0.3,
      trust: 0.8,
      disgust: 0.05,
      anticipation: 0.6
    },
    goal: {
      high: '개인 성장',
      sub: ['독서', '운동', '기록'],
      completion: 0.6,
      priority: 'high'
    },
    cognitive: {
      tone: '긍정',
      causal_sentences: 5,
      complexity_score: 0.7,
      reflection_depth: 0.8
    },
    relation: {
      main_person: '가족',
      emotion: '감사',
      interaction_type: '대화',
      closeness_level: 0.9
    },
    temporal: {
      time: '저녁',
      weekday: '일요일',
      season: '가을',
      energy_level: 0.7
    },
    identity: {
      roles: ['학생', '자녀'],
      adjectives: ['성실한', '조용한', '사려깊은'],
      core_values: ['성장', '가족', '학습'],
      self_perception: 0.8
    },
    growth: {
      reflection: 0.8,
      stability: 0.7,
      learning_mentions: 3,
      challenge_response: '적극적'
    },
    meta: {
      word_count: 540,
      platform: 'mobile',
      writing_duration: 15,
      mood_consistency: 0.85
    }
  };
}