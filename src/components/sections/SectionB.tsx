'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, TrendingUp, BarChart3, Brain, ShieldCheck } from 'lucide-react'
import NodeCard, { NodeStatus } from '@/components/NodeCard'

interface SectionBProps {
  isActive: boolean
  currentNode: number
  onToggle: () => void
}

export default function SectionB({ isActive, currentNode, onToggle }: SectionBProps) {
  const getNodeStatus = (nodeNum: number): NodeStatus => {
    if (nodeNum < currentNode) return 'complete'
    if (nodeNum === currentNode) return 'running'
    return 'pending'
  }

  const nodes = [
    {
      number: 5,
      title: 'Multi-Source Trends',
      description: 'Parallel API calls to fetch 250+ trending topics from multiple platforms',
      icon: TrendingUp,
      details: [
        'YouTube Trending: 50 videos',
        'Google Trends (SerpAPI)',
        'Twitter/X trends',
        'Reddit hot topics',
        'News API aggregation'
      ]
    },
    {
      number: 6,
      title: 'Aggregate & Rank',
      description: 'Deduplicates keywords and calculates relevance scores',
      icon: BarChart3,
      details: [
        'Deduplicate keywords across sources',
        'Calculate relevance scores',
        'Factor: mentions, engagement, recency',
        'Rank top 20 topics by channel fit'
      ]
    },
    {
      number: 7,
      title: 'AI Topic Selector',
      description: 'Claude Sonnet 4.5 analyzes trends vs channel profile',
      icon: Brain,
      details: [
        'Model: Claude Sonnet 4.5',
        'Analyzes: trends vs channel profile',
        'Checks: recent videos, competition',
        'Outputs: unique angle, target length',
        'Includes: SEO keywords, estimated views'
      ]
    },
    {
      number: 8,
      title: 'Topic Validation',
      description: 'Validates topic for competition, policy, resources, and uniqueness',
      icon: ShieldCheck,
      details: [
        'Competition check: not dominated by mega-channels',
        'Policy compliance: Gemini 3 verification',
        'Resource availability check',
        'Uniqueness: not covered in last 30 days',
        'Auto-regenerate if validation fails'
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
          <div className="section-icon bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">Section B: Content Research</h2>
              <span className="node-badge bg-blue-500/20 text-blue-400">Nodes 5-8</span>
            </div>
            <p className="text-sm text-dark-400 mt-1">
              Trend discovery, topic ranking, AI selection, and validation
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
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
