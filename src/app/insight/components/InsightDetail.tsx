'use client';

import { motion } from 'framer-motion';
import { SectionType, InsightData } from '@/types/insightTypes';
import { getSectionTitle, getSectionIcon, getSectionColor } from '../utils/parseInsightData';
import EmotionChart from './charts/EmotionChart';
import GoalTree from './charts/GoalTree';
import CognitiveChart from './charts/CognitiveChart';
import RelationGraph from './charts/RelationGraph';
import TemporalHeatmap from './charts/TemporalHeatmap';
import IdentityWheel from './charts/IdentityWheel';
import GrowthArc from './charts/GrowthArc';
import MetaTimeline from './charts/MetaTimeline';

interface InsightDetailProps {
  section: SectionType;
  data: InsightData;
  onBack: () => void;
}

export default function InsightDetail({ section, data, onBack }: InsightDetailProps) {
  const renderChart = () => {
    switch (section) {
      case 'emotion':
        return <EmotionChart data={data.emotion} />;
      case 'goal':
        return <GoalTree data={data.goal} />;
      case 'cognitive':
        return <CognitiveChart data={data.cognitive} />;
      case 'relation':
        return <RelationGraph data={data.relation} />;
      case 'temporal':
        return <TemporalHeatmap data={data.temporal} />;
      case 'identity':
        return <IdentityWheel data={data.identity} />;
      case 'growth':
        return <GrowthArc data={data.growth} />;
      case 'meta':
        return <MetaTimeline data={data.meta} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className={`
        relative p-8 rounded-3xl bg-gradient-to-br ${getSectionColor(section)}
        border border-white/20 backdrop-blur-sm
        overflow-hidden
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getSectionIcon(section)}</span>
            <div>
              <h2 className="text-3xl font-light text-white">
                {getSectionTitle(section)}
              </h2>
              <p className="text-white/80 mt-1">
                상세 분석 결과
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          {renderChart()}
        </motion.div>

        <motion.div
          className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.05, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}