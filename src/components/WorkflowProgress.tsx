'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'

interface WorkflowProgressProps {
  currentNode: number
  totalNodes: number
  isRunning: boolean
}

const sections = [
  { name: 'Setup', nodes: [1, 2, 3, 4], color: 'emerald' },
  { name: 'Research', nodes: [5, 6, 7, 8], color: 'blue' },
  { name: 'Script', nodes: [9, 10, 11, 12, 13, 14, 15], color: 'purple' },
  { name: 'Visual', nodes: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25], color: 'pink' }
]

export default function WorkflowProgress({ currentNode, totalNodes, isRunning }: WorkflowProgressProps) {
  const progress = (currentNode / totalNodes) * 100

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Workflow Progress</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-400">Node</span>
          <span className="text-lg font-bold text-gradient">{currentNode}/{totalNodes}</span>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="relative h-3 bg-dark-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        {isRunning && (
          <motion.div
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['0%', '500%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* Section Progress */}
      <div className="grid grid-cols-4 gap-4">
        {sections.map((section, idx) => {
          const sectionComplete = section.nodes.every(n => n < currentNode)
          const sectionActive = section.nodes.some(n => n === currentNode)
          const sectionProgress = section.nodes.filter(n => n < currentNode).length / section.nodes.length * 100

          const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
            emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
            blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
            purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
            pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' }
          }

          const colors = colorClasses[section.color]

          return (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 rounded-xl border ${colors.border} ${colors.bg} relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${colors.text}`}>{section.name}</span>
                {sectionComplete ? (
                  <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                ) : sectionActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className={`w-4 h-4 ${colors.text}`} />
                  </motion.div>
                ) : (
                  <Circle className="w-4 h-4 text-dark-500" />
                )}
              </div>
              
              {/* Mini progress */}
              <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${section.color === 'emerald' ? 'bg-emerald-500' : section.color === 'blue' ? 'bg-blue-500' : section.color === 'purple' ? 'bg-purple-500' : 'bg-pink-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${sectionProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <span className="text-xs text-dark-500 mt-1 block">
                {section.nodes.filter(n => n < currentNode).length}/{section.nodes.length} nodes
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
