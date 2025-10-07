'use client';

import { motion } from 'framer-motion';
import { SectionType } from '@/types/insightTypes';
import { getSectionTitle, getSectionIcon, getSectionColor } from '../utils/parseInsightData';

interface InsightCardProps {
  section: SectionType;
  summary: string;
  onClick: () => void;
  index: number;
}

export default function InsightCard({ section, summary, onClick, index }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        damping: 20,
        stiffness: 300
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className={`
        relative p-6 rounded-2xl bg-gradient-to-br ${getSectionColor(section)}
        shadow-lg hover:shadow-2xl transition-all duration-300
        border border-white/20 backdrop-blur-sm
        overflow-hidden
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{getSectionIcon(section)}</span>
            <motion.div
              className="w-6 h-6 border-2 border-white/60 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
          </div>

          <h3 className="text-white text-lg font-medium mb-3">
            {getSectionTitle(section)}
          </h3>

          <p className="text-white/80 text-sm leading-relaxed">
            {summary}
          </p>

          <div className="mt-4 flex items-center text-white/60 text-xs">
            <span>자세히 보기</span>
            <motion.span
              className="ml-1"
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </div>
        </div>

        <motion.div
          className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}