import re

with open("src/components/Projects.tsx", "r") as f:
    content = f.read()

new_widget = """
          <div className="grid grid-cols-1 gap-6 print-hidden mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm dark:shadow-none flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white">
                  {t('projects.impactTrends', 'Project Impact & Trends')}
                </h3>
              </div>
              
              <div className="h-[300px] w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      axisLine={{ stroke: '#cbd5e1', opacity: 0.2 }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#f8fafc',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      itemStyle={{ color: '#2dd4bf' }}
                    />
                    <Line type="monotone" dataKey="commits" name="Activity (Commits)" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4, fill: '#14b8a6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="impact" name="Impact Score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
"""

# Find the end of the grid div
target = """            </motion.div>
          </div>"""
content = content.replace(target, target + new_widget)

with open("src/components/Projects.tsx", "w") as f:
    f.write(content)

