'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Settings, ChevronDown, ChevronUp, Clock, Key, User, Users } from 'lucide-react'
import NodeCard, { NodeStatus } from '@/components/NodeCard'

interface SectionAProps {
  isActive: boolean
  currentNode: number
  onToggle: () => void
}

export default function SectionA({ isActive, currentNode, onToggle }: SectionAProps) {
  const getNodeStatus = (nodeNum: number): NodeStatus => {
    if (nodeNum < currentNode) return 'complete'
    if (nodeNum === currentNode) return 'running'
    return 'pending'
  }

  const nodes = [
    {
      number: 1,
      title: 'Schedule Trigger',
      description: 'Cron-based daily execution at 6 AM IST with retry logic',
      icon: Clock,
      details: [
        'Cron expression: 0 6 * * *',
        'Retry: 3 attempts with exponential backoff',
        'Timezone: Asia/Kolkata (IST)'
      ]
    },
    {
      number: 2,
      title: 'Global Config',
      description: 'Sets environment variables, API keys, cost tracking, and quality thresholds',
      icon: Key,
      details: [
        'APIs: Claude 4.5, GPT-5.2, Gemini 3, HeyGen, Leonardo, YouTube',
        'Budget: $10/video',
        'Quality: Script 85%, Video 90%'
      ]
    },
    {
      number: 3,
      title: 'Channel Profile Manager',
      description: 'Loads channel data and AI analysis via Claude to understand content style',
      icon: User,
      details: [
        'Audience preferences analysis',
        'Successful patterns detection',
        'Voice/tone optimization',
        'Optimal video length calculation',
        'Output: Channel DNA profile'
      ]
    },
    {
      number: 4,
      title: 'Avatar Setup',
      description: 'Configures 4 HeyGen avatars with day-based rotation and voice settings',
      icon: Users,
      details: [
        'Avatars: Casual, Professional, Traditional, Party',
        'Day-based rotation schedule',
        'Voice: HeyGen primary + ElevenLabs fallback'
      ]
    }
  ]

  return (
    <div className="glass-card overflow-hidden">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-dark-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="section-icon bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">Section A: Setup</h2>
              <span className="node-badge bg-emerald-500/20 text-emerald-400">Nodes 1-4</span>
            </div>
            <p className="text-sm text-dark-400 mt-1">
              Initialize workflow, configure APIs, load channel profile, setup avatars
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Progress indicator */}
          <div className="hidden md:flex items-center gap-2">
            {nodes.map((node) => (
              <div
                key={node.number}
                className={`w-2 h-2 rounded-full transition-colors ${
                  getNodeStatus(node.number) === 'complete' ? 'bg-emerald-500' :
                  getNodeStatus(node.number) === 'running' ? 'bg-primary-500 animate-pulse' :
                  'bg-dark-600'
                }`}
              />
            ))}
          </div>
          
          {isActive ? (
            <ChevronUp className="w-5 h-5 text-dark-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-dark-400" />
          )}
        </div>
      </button>

      {/* Section Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 grid md:grid-cols-2 gap-4">
              {nodes.map((node, idx) => (
                <motion.div
                  key={node.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NodeCard
                    number={node.number}
                    title={node.title}
                    description={node.description}
                    icon={node.icon}
                    status={getNodeStatus(node.number)}
                    details={node.details}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
