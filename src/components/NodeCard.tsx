'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Loader2, AlertCircle, StopCircle } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export type NodeStatus = 'pending' | 'running' | 'complete' | 'checkpoint' | 'error'

interface NodeCardProps {
  number: number
  title: string
  description: string
  icon: LucideIcon
  status: NodeStatus
  details?: string[]
  cost?: string
  isCheckpoint?: boolean
  checkpointActions?: string[]
}

export default function NodeCard({
  number,
  title,
  description,
  icon: Icon,
  status,
  details = [],
  cost,
  isCheckpoint = false,
  checkpointActions = []
}: NodeCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      case 'running':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-5 h-5 text-primary-400" />
          </motion.div>
        )
      case 'checkpoint':
        return <StopCircle className="w-5 h-5 text-amber-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Circle className="w-5 h-5 text-dark-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'complete':
        return 'border-emerald-500/30 bg-emerald-500/5'
      case 'running':
        return 'border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10'
      case 'checkpoint':
        return 'border-amber-500/50 bg-amber-500/5'
      case 'error':
        return 'border-red-500/30 bg-red-500/5'
      default:
        return 'border-dark-700 bg-dark-800/30'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`node-card ${getStatusColor()} ${isCheckpoint ? 'ring-2 ring-amber-500/30' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            status === 'running' ? 'bg-primary-500/20' : 
            status === 'complete' ? 'bg-emerald-500/20' :
            status === 'checkpoint' ? 'bg-amber-500/20' :
            'bg-dark-700'
          }`}>
            <Icon className={`w-4 h-4 ${
              status === 'running' ? 'text-primary-400' :
              status === 'complete' ? 'text-emerald-400' :
              status === 'checkpoint' ? 'text-amber-400' :
              'text-dark-400'
            }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="node-badge bg-dark-700 text-dark-300">Node {number}</span>
              {isCheckpoint && (
                <span className="node-badge bg-amber-500/20 text-amber-400">🛑 CHECKPOINT</span>
              )}
            </div>
            <h4 className="font-semibold text-white mt-1">{title}</h4>
          </div>
        </div>
        {getStatusIcon()}
      </div>

      {/* Description */}
      <p className="text-sm text-dark-400 mb-3">{description}</p>

      {/* Details */}
      {details.length > 0 && (
        <ul className="space-y-1 mb-3">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-dark-500">
              <span className="w-1 h-1 rounded-full bg-dark-500" />
              {detail}
            </li>
          ))}
        </ul>
      )}

      {/* Checkpoint Actions */}
      {isCheckpoint && checkpointActions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-dark-700">
          {checkpointActions.map((action, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs rounded-md bg-dark-700 text-dark-300 hover:bg-dark-600 cursor-pointer transition-colors"
            >
              {action}
            </span>
          ))}
        </div>
      )}

      {/* Cost */}
      {cost && (
        <div className="mt-3 pt-3 border-t border-dark-700 flex items-center justify-between">
          <span className="text-xs text-dark-500">Cost</span>
          <span className="text-sm font-medium text-amber-400">{cost}</span>
        </div>
      )}

      {/* Running Animation */}
      {status === 'running' && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        />
      )}
    </motion.div>
  )
}
