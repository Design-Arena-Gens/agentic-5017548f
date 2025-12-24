'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronDown, ChevronUp, ListTree, PenTool, StopCircle, Edit3, ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react'
import NodeCard, { NodeStatus } from '@/components/NodeCard'

interface SectionCProps {
  isActive: boolean
  currentNode: number
  onToggle: () => void
}

export default function SectionC({ isActive, currentNode, onToggle }: SectionCProps) {
  const getNodeStatus = (nodeNum: number): NodeStatus => {
    if (nodeNum === 11) return nodeNum <= currentNode ? 'checkpoint' : 'pending'
    if (nodeNum < currentNode) return 'complete'
    if (nodeNum === currentNode) return 'running'
    return 'pending'
  }

  const nodes = [
    {
      number: 9,
      title: 'Script Structure',
      description: 'Claude creates detailed outline with sections, durations, and visual cues',
      icon: ListTree,
      details: [
        'Hook: 0-5s attention grabber',
        'Intro: 5-30s context setting',
        '3-5 main sections with duration',
        'Engagement points throughout',
        'Visual cues & B-roll requirements'
      ]
    },
    {
      number: 10,
      title: 'Full Script Generation',
      description: 'Claude writes complete word-for-word script in channel voice',
      icon: PenTool,
      details: [
        'Emotion markers: [EXCITED], [CURIOUS]',
        'Visual cues: {SHOW: X}',
        'Personal stories integration',
        'Natural language: contractions, fillers',
        'Temperature: 0.8 for creativity'
      ]
    },
    {
      number: 11,
      title: 'CHECKPOINT 1',
      description: 'Webhook displays script with quality metrics for human review',
      icon: StopCircle,
      isCheckpoint: true,
      checkpointActions: ['Approve', 'Edit', 'Regenerate', 'Chat'],
      details: [
        'Human-like score: 92/100',
        'Engagement score: 85/100',
        'SEO score: 78/100',
        'Workflow pauses for user input'
      ]
    },
    {
      number: 12,
      title: 'Script Editor',
      description: 'Rich text editor with AI assistant for inline edits',
      icon: Edit3,
      details: [
        'AI suggestions: "add humor", "simplify"',
        'Word count display',
        'Duration estimate',
        'Real-time collaboration'
      ]
    },
    {
      number: 13,
      title: 'Triple Quality Check',
      description: 'Multi-model validation for human-likeness, copyright, and policy',
      icon: ShieldCheck,
      details: [
        'GPT-5.2: Human-likeness score',
        'Gemini 3: Copyright/plagiarism check',
        'Gemini 3: YouTube policy compliance',
        'Checks: misinformation, hate speech'
      ]
    },
    {
      number: 14,
      title: 'Auto-Fix',
      description: 'Claude fixes high-confidence issues automatically',
      icon: Wrench,
      details: [
        'High-confidence (>85%): auto-fix',
        'Grammar corrections',
        'Tone adjustments',
        'Rephrasing copyrighted sections',
        'Low-confidence: flagged for review'
      ]
    },
    {
      number: 15,
      title: 'Final Approval',
      description: 'Sets approved script with comprehensive metadata',
      icon: CheckCircle2,
      details: [
        'Word count finalization',
        'Duration calculation',
        'Readability score',
        'SEO keywords',
        'Emotion timeline'
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
          <div className="section-icon bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">Section C: Script Generation</h2>
              <span className="node-badge bg-purple-500/20 text-purple-400">Nodes 9-15</span>
              <span className="checkpoint-badge">🛑 1 Checkpoint</span>
            </div>
            <p className="text-sm text-dark-400 mt-1">
              Structure, generation, review, quality checks, and approval
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {nodes.map((node) => (
              <div
                key={node.number}
                className={`w-2 h-2 rounded-full transition-colors ${
                  node.isCheckpoint ? 'bg-amber-500' :
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
            <div className="p-6 pt-0 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nodes.map((node, idx) => (
                <motion.div
                  key={node.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={node.isCheckpoint ? 'md:col-span-2 lg:col-span-1' : ''}
                >
                  <NodeCard
                    number={node.number}
                    title={node.title}
                    description={node.description}
                    icon={node.icon}
                    status={getNodeStatus(node.number)}
                    details={node.details}
                    isCheckpoint={node.isCheckpoint}
                    checkpointActions={node.checkpointActions}
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
