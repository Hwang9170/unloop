'use client';

import { motion } from 'framer-motion';
import { RelationData } from '@/types/insightTypes';
import { SupportedLanguage } from '@/types/language';

interface RelationGraphProps {
  data: RelationData;
  language: SupportedLanguage;
}

const emotionColors: Record<string, string> = {
  감사: '#10B981',
  gratitude: '#10B981',
  기쁨: '#F59E0B',
  joy: '#F59E0B',
  사랑: '#EF4444',
  love: '#EF4444',
  존경: '#8B5CF6',
  respect: '#8B5CF6',
  그리움: '#06B6D4',
  longing: '#06B6D4',
  걱정: '#F97316',
  worry: '#F97316',
  실망: '#6B7280',
  disappointment: '#6B7280',
};

export default function RelationGraph({ data, language }: RelationGraphProps) {
  const isKorean = language === 'ko';
  const emotionColor = emotionColors[data.emotion.toLowerCase()] || emotionColors[data.emotion] || '#6B7280';

  const closenessPercentage = Math.round(data.closeness_level * 100);

  const relationshipNodes = [
    { id: 'self', label: isKorean ? '나' : 'Me', x: 50, y: 50, type: 'self' },
    { id: 'main', label: data.main_person, x: 20, y: 30, type: 'main' },
    { id: 'family', label: isKorean ? '가족' : 'Family', x: 80, y: 25, type: 'secondary' },
    { id: 'friends', label: isKorean ? '친구들' : 'Friends', x: 75, y: 75, type: 'secondary' },
    { id: 'work', label: isKorean ? '동료' : 'Colleagues', x: 25, y: 80, type: 'secondary' }
  ];

  const connections = [
    { from: 'self', to: 'main', strength: data.closeness_level },
    { from: 'self', to: 'family', strength: 0.8 },
    { from: 'self', to: 'friends', strength: 0.6 },
    { from: 'self', to: 'work', strength: 0.4 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">
          {isKorean ? '관계 네트워크' : 'Relationship network'}
        </h3>

        <div className="relative h-80 bg-white/5 rounded-xl border border-white/10 mb-6 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {connections.map((connection, index) => {
              const fromNode = relationshipNodes.find(n => n.id === connection.from);
              const toNode = relationshipNodes.find(n => n.id === connection.to);
              if (!fromNode || !toNode) return null;

              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={connection.strength * 2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
              );
            })}

            {relationshipNodes.map((node, index) => (
              <motion.g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.type === 'self' ? 4 : node.type === 'main' ? 3.5 : 2.5}
                  fill={node.type === 'self' ? '#9333EA' : node.type === 'main' ? emotionColor : 'rgba(255,255,255,0.6)'}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                />
                <motion.text
                  x={node.x}
                  y={node.y - 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="3"
                  fontWeight={node.type === 'self' ? 'bold' : 'normal'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  {node.label}
                </motion.text>
              </motion.g>
            ))}
          </svg>

          <div className="absolute top-4 right-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-white/80 text-xs mb-1">
              {isKorean ? '주요 관계' : 'Key relationship'}
            </div>
            <div className="text-white text-sm font-medium">{data.main_person}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
        >
          <div className="text-white/80 text-sm mb-2">
            {isKorean ? '관계 감정' : 'Relationship emotion'}
          </div>
          <div
            className="w-6 h-6 rounded-full mx-auto mb-2"
            style={{ backgroundColor: emotionColor }}
          />
          <div className="text-white font-medium">{data.emotion}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
        >
          <div className="text-white/80 text-sm mb-2">
            {isKorean ? '소통 방식' : 'Interaction style'}
          </div>
          <div className="text-white font-medium">{data.interaction_type}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
        >
          <div className="text-white/80 text-sm mb-2">
            {isKorean ? '친밀도' : 'Closeness'}
          </div>
          <div className="text-2xl font-light text-white mb-1">{closenessPercentage}%</div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: emotionColor }}
              initial={{ width: 0 }}
              animate={{ width: `${closenessPercentage}%` }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </div>
        </motion.div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">
          {isKorean ? '관계 분석' : 'Relationship analysis'}
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {isKorean ? '오늘 일기에서 가장 중요하게 언급된 인물은 ' : 'The most significant person in today\'s entry is '}
          <strong>{data.main_person}</strong>
          {isKorean ? '입니다. 이 관계에서 느끼는 주요 감정은 ' : '. The dominant emotion you feel is '}
          <strong>{data.emotion}</strong>
          {isKorean ? '이며, 주로 ' : ' and you mainly communicate through '}
          <strong>{data.interaction_type}</strong>
          {isKorean ? ' 방식으로 소통하고 있습니다. 현재 친밀도는 ' : '. Current closeness is '}
          {closenessPercentage}%
          {isKorean ? '로,' : ', which suggests '}
          {isKorean
            ? closenessPercentage > 80
              ? ' 매우 긍정적이고 가까운 관계로 분석됩니다.'
              : closenessPercentage > 60
                ? ' 좋은 관계로 분석됩니다.'
                : closenessPercentage > 40
                  ? ' 보통의 관계로 분석됩니다.'
                  : ' 개선이 필요한 관계로 분석됩니다.'
            : closenessPercentage > 80
              ? ' a very strong and positive relationship.'
              : closenessPercentage > 60
                ? ' a healthy and supportive relationship.'
                : closenessPercentage > 40
                  ? ' a neutral relationship.'
                  : ' there is room to strengthen this relationship.'}
        </p>
      </div>
    </div>
  );
}
