import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

const primarySkillsData = [
  { subject: 'Python', level: 90, fullMark: 100 },
  { subject: 'SQL', level: 85, fullMark: 100 },
  { subject: 'JavaScript', level: 85, fullMark: 100 },
  { subject: 'React', level: 80, fullMark: 100 },
  { subject: 'Pandas', level: 90, fullMark: 100 },
  { subject: 'Power BI', level: 80, fullMark: 100 },
  { subject: 'Git', level: 90, fullMark: 100 },
];

export function SkillChart() {
  return (
    <div className="h-[300px] md:h-[400px] w-full bg-white dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center shadow-sm relative">
      <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white mb-4">Core Proficiency</h3>
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={primarySkillsData}>
            <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 500 }} 
              className="text-slate-600 dark:text-slate-400"
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false} 
              axisLine={false} 
            />
            <Radar
              name="Proficiency"
              dataKey="level"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.25}
              isAnimationActive={true}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderColor: '#1e293b', 
                borderRadius: '8px', 
                color: '#f8fafc',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#2dd4bf' }}
              formatter={(value: number) => [`${value}%`, 'Proficiency']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
