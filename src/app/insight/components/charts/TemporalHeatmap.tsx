'use client';

import { motion } from 'framer-motion';
import { TemporalData } from '@/types/insightTypes';

interface TemporalHeatmapProps {
  data: TemporalData;
}

export default function TemporalHeatmap({ data }: TemporalHeatmapProps) {
  const timeSlots = [
    '새벽', '아침', '오전', '점심', '오후', '저녁', '밤', '늦은밤'
  ];

  const weekdays = [
    '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'
  ];

  const energyPercentage = Math.round(data.energy_level * 100);

  const getTimeIntensity = (time: string) => {
    if (time === data.time) return 1;
    const currentIndex = timeSlots.indexOf(data.time);
    const timeIndex = timeSlots.indexOf(time);
    const distance = Math.abs(currentIndex - timeIndex);
    return Math.max(0, 1 - (distance * 0.3));
  };

  const getWeekdayIntensity = (weekday: string) => {
    return weekday === data.weekday ? 1 : Math.random() * 0.6 + 0.2;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">시간 패턴 분석</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-white text-sm font-medium mb-4">시간대별 활동</h4>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time, index) => {
                const intensity = getTimeIntensity(time);
                return (
                  <motion.div
                    key={time}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`
                      p-3 rounded-lg text-center text-xs border border-white/20
                      ${time === data.time ? 'bg-purple-500' : 'bg-white/10'}
                    `}
                    style={{
                      backgroundColor: time === data.time ? undefined : `rgba(147, 51, 234, ${intensity * 0.6})`
                    }}
                  >
                    <div className="text-white font-medium">{time}</div>
                    {time === data.time && (
                      <div className="text-white/80 text-xs mt-1">현재</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">요일별 패턴</h4>
            <div className="space-y-2">
              {weekdays.map((weekday, index) => {
                const intensity = getWeekdayIntensity(weekday);
                return (
                  <motion.div
                    key={weekday}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/10 border border-white/20"
                  >
                    <span className={`text-sm ${weekday === data.weekday ? 'text-white font-medium' : 'text-white/80'}`}>
                      {weekday}
                    </span>
                    <div className="w-16 bg-white/20 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${weekday === data.weekday ? 'bg-purple-400' : 'bg-white/60'}`}
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
            <div className="text-white/80 text-sm mb-2">현재 시간</div>
            <div className="text-2xl font-light text-white">{data.time}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">요일</div>
            <div className="text-2xl font-light text-white">{data.weekday}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">에너지 레벨</div>
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
        <h4 className="text-white text-sm font-medium mb-2">시간 패턴 요약</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          오늘은 <strong>{data.weekday}</strong> <strong>{data.time}</strong>에 일기를 작성했습니다.
          현재 에너지 레벨은 {energyPercentage}%로,
          {energyPercentage > 70 ? ' 활기찬 상태' :
           energyPercentage > 50 ? ' 보통 상태' :
           energyPercentage > 30 ? ' 다소 피곤한 상태' : ' 휴식이 필요한 상태'}를 보이고 있습니다.
          {data.season && ` ${data.season} 계절의 영향으로 전반적인 기분과 활동 패턴에 변화가 있을 수 있습니다.`}
        </p>
      </div>
    </div>
  );
}