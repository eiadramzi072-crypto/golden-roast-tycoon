import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useGame } from '@/contexts/GameContext';
import { useTranslation } from '@/hooks/useTranslation';
import { formatNumber } from '@/lib/gameData';

const WealthChart: React.FC = () => {
  const { beanHistory } = useGame();
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    return beanHistory.map((entry, index) => ({
      time: index,
      beans: Math.floor(entry.beans),
    }));
  }, [beanHistory]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <p className="text-primary font-semibold">
            🫘 {formatNumber(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="game-card h-full flex flex-col">
      <h2 className="text-lg font-display font-semibold text-primary mb-2">
        {t('wealthChart')}
      </h2>
      
      <div className="flex-1 min-h-[120px]">
        {chartData.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="beansGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(30, 45%, 64%)" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="hsl(38, 55%, 55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(32, 70%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide domain={['dataMin', 'dataMax']} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="beans"
                stroke="hsl(30, 45%, 64%)"
                strokeWidth={2}
                fill="url(#beansGradient)"
                animationDuration={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            {t('click')} ☕
          </div>
        )}
      </div>
    </div>
  );
};

export default WealthChart;
