'use client';

import { motion } from 'framer-motion';
import { TemporalData } from '@/types/insightTypes';
import { SupportedLanguage } from '@/types/language';

interface TemporalHeatmapProps {
  data: TemporalData;
  language: SupportedLanguage;
}

const timeDefinitions = [
  { key: 'dawn', ko: '새벽', en: 'Dawn' },
  { key: 'morning', ko: '아침', en: 'Morning' },
  { key: 'late_morning', ko: '오전', en: 'Late morning' },
  { key: 'noon', ko: '점심', en: 'Midday' },
  { key: 'afternoon', ko: '오후', en: 'Afternoon' },
  { key: 'evening', ko: '저녁', en: 'Evening' },
  { key: 'night', ko: '밤', en: 'Night' },
  { key: 'late_night', ko: '늦은밤', en: 'Late night' },
];

const weekdayDefinitions = [
  { key: 'mon', ko: '월요일', en: 'Monday' },
  { key: 'tue', ko: '화요일', en: 'Tuesday' },
  { key: 'wed', ko: '수요일', en: 'Wednesday' },
  { key: 'thu', ko: '목요일', en: 'Thursday' },
  { key: 'fri', ko: '금요일', en: 'Friday' },
  { key: 'sat', ko: '토요일', en: 'Saturday' },
  { key: 'sun', ko: '일요일', en: 'Sunday' },
];

function normalizeValue(value: string, defs: Array<{ key: string; ko: string; en: string }>): string {
  const found = defs.find((def) => def.ko === value || def.en.toLowerCase() === value.toLowerCase());
  return found?.key ?? defs[0].key;
}

export default function TemporalHeatmap({ data, language }: TemporalHeatmapProps) {
  const isKorean = language === 'ko';
  const selectedTimeKey = normalizeValue(data.time, timeDefinitions);
  const selectedWeekdayKey = normalizeValue(data.weekday, weekdayDefinitions);
  const timeOptions = timeDefinitions.map((def) => ({ key: def.key, label: def[language] }));
  const weekdayOptions = weekdayDefinitions.map((def) => ({ key: def.key, label: def[language] }));
  const selectedTimeLabel = timeDefinitions.find((def) => def.key === selectedTimeKey)?.[language] ?? data.time;
  const selectedWeekdayLabel = weekdayDefinitions.find((def) => def.key === selectedWeekdayKey)?.[language] ?? data.weekday;

  const energyPercentage = Math.round((data.energy_level ?? 0) * 100);

  const getTimeIntensity = (timeKey: string) => {
    const currentIndex = timeDefinitions.findIndex((def) => def.key === selectedTimeKey);
    const timeIndex = timeDefinitions.findIndex((def) => def.key === timeKey);
    if (currentIndex === -1 || timeIndex === -1) {
      return 0.3;
    }
    const distance = Math.abs(currentIndex - timeIndex);
    return Math.max(0, 1 - distance * 0.3);
  };

  const getWeekdayIntensity = (weekdayKey: string) => {
    return weekdayKey === selectedWeekdayKey ? 1 : Math.random() * 0.6 + 0.2;
  };

  const energyDescriptor = isKorean
    ? energyPercentage > 70
      ? ' 활기찬 상태'
      : energyPercentage > 50
        ? ' 보통 상태'
        : energyPercentage > 30
          ? ' 다소 피곤한 상태'
          : ' 휴식이 필요한 상태'
    : energyPercentage > 70
      ? ' full of energy'
      : energyPercentage > 50
        ? ' in a balanced state'
        : energyPercentage > 30
          ? ' a little tired'
          : ' in need of rest';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">
          {isKorean ? '시간 패턴 분석' : 'Temporal rhythm'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {isKorean ? '시간대별 활동' : 'Activity by time of day'}
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {timeOptions.map(({ key, label }, index) => {
                const intensity = getTimeIntensity(key);
                const isActive = key === selectedTimeKey;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`
                      p-3 rounded-lg text-center text-xs border border-white/20
                      ${isActive ? 'bg-purple-500' : 'bg-white/10'}
                    `}
                    style={{
                      backgroundColor: isActive ? undefined : `rgba(147, 51, 234, ${intensity * 0.6})`,
                    }}
                  >
                    <div className="text-white font-medium">{label}</div>
                    {isActive && (
                      <div className="text-white/80 text-xs mt-1">
                        {isKorean ? '현재' : 'Now'}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {isKorean ? '요일별 패턴' : 'Weekly cadence'}
            </h4>
            <div className="space-y-2">
              {weekdayOptions.map(({ key, label }, index) => {
                const intensity = getWeekdayIntensity(key);
                const isActive = key === selectedWeekdayKey;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/10 border border-white/20"
                  >
                    <span className={`text-sm ${isActive ? 'text-white font-medium' : 'text-white/80'}`}>
                      {label}
                    </span>
                    <div className="w-16 bg-white/20 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${isActive ? 'bg-purple-400' : 'bg-white/60'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${intensity * 100}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '현재 시간' : 'Current time'}
            </div>
            <div className="text-2xl font-light text-white">{selectedTimeLabel}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '요일' : 'Weekday'}
            </div>
            <div className="text-2xl font-light text-white">{selectedWeekdayLabel}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '에너지 레벨' : 'Energy level'}
            </div>
            <div className="text-2xl font-light text-white mb-2">{energyPercentage}%</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${energyPercentage}%` }}
                transition={{ delay: 1.8, duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">
          {isKorean ? '시간 패턴 요약' : 'Summary'}
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {isKorean ? '오늘은 ' : 'You wrote this diary on '}
          <strong>{selectedWeekdayLabel}</strong>
          {isKorean ? ' ' : ' during the '}
          <strong>{selectedTimeLabel}</strong>
          {isKorean ? '에 일기를 작성했습니다. 현재 에너지 레벨은 ' : ' window. Your current energy level is '}
          {energyPercentage}%
          {energyDescriptor}.
          {data.season && (
            <>
              {' '}
              {isKorean
                ? `${data.season} 계절의 영향으로 전반적인 기분과 활동 패턴에 변화가 있을 수 있습니다.`
                : `Seasonal context (${data.season}) may also be shaping your mood and routines.`}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
