'use client'

import { motion } from 'framer-motion'
import { DollarSign, TrendingDown, Zap, Image, Video, Mic } from 'lucide-react'

interface CostTrackerProps {
  currentNode: number
}

const costItems = [
  { label: 'Thumbnails', icon: Image, cost: 0.08, node: 18, color: 'text-blue-400' },
  { label: 'Avatar Video', icon: Video, cost: 0.60, node: 19, color: 'text-purple-400' },
  { label: 'Sora B-roll', icon: Video, cost: 2.50, node: 20, color: 'text-pink-400' },
  { label: 'Veo B-roll', icon: Video, cost: 1.80, node: 21, color: 'text-amber-400' },
  { label: 'Luma Animation', icon: Zap, cost: 0.45, node: 22, color: 'text-cyan-400' },
  { label: 'Voice (ElevenLabs)', icon: Mic, cost: 0.35, node: 4, color: 'text-emerald-400' },
]

export default function CostTracker({ currentNode }: CostTrackerProps) {
  const activeCosts = costItems.filter(item => item.node <= currentNode)
  const currentCost = activeCosts.reduce((sum, item) => sum + item.cost, 0)
  const totalBudget = 10
  const budgetUsed = (currentCost / totalBudget) * 100

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Cost Tracking</h3>
            <p className="text-sm text-dark-400">Budget: ${totalBudget}/video</p>
          </div>
        </div>
        
        <div className="text-right">
          <motion.div
            key={currentCost}
            initial={{ scale: 1.2, color: '#f59e0b' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="text-2xl font-bold"
          >
            ${currentCost.toFixed(2)}
          </motion.div>
          <div className="flex items-center gap-1 text-emerald-400 text-sm">
            <TrendingDown className="w-3 h-3" />
            <span>${(totalBudget - currentCost).toFixed(2)} remaining</span>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-dark-400">Budget Usage</span>
          <span className="text-dark-300">{budgetUsed.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${budgetUsed > 80 ? 'bg-red-500' : budgetUsed > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(budgetUsed, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {costItems.map((item, idx) => {
          const isActive = item.node <= currentNode

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 rounded-lg border transition-all ${
                isActive
                  ? 'border-dark-600 bg-dark-800/50'
                  : 'border-dark-800 bg-dark-900/30 opacity-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`w-4 h-4 ${isActive ? item.color : 'text-dark-500'}`} />
                <span className="text-xs text-dark-400 truncate">{item.label}</span>
              </div>
              <div className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-dark-600'}`}>
                ${item.cost.toFixed(2)}
              </div>
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className={`h-0.5 mt-2 rounded-full ${item.color.replace('text-', 'bg-')}`}
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
