'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, ChevronDown, ChevronUp, Scissors, UserCircle, Image, 
  Video, Film, Sparkles, ImageIcon, StopCircle, FolderOpen 
} from 'lucide-react'
import NodeCard, { NodeStatus } from '@/components/NodeCard'

interface SectionDProps {
  isActive: boolean
  currentNode: number
  onToggle: () => void
}

export default function SectionD({ isActive, currentNode, onToggle }: SectionDProps) {
  const getNodeStatus = (nodeNum: number): NodeStatus => {
    if (nodeNum === 24) return nodeNum <= currentNode ? 'checkpoint' : 'pending'
    if (nodeNum < currentNode) return 'complete'
    if (nodeNum === currentNode) return 'running'
    return 'pending'
  }

  const nodes = [
    {
      number: 16,
      title: 'Scene Breakdown',
      description: 'Splits script into scenes with visual requirements per timestamp',
      icon: Scissors,
      details: [
        'Segment types: avatar, B-roll, animation',
        'Extract visual requirements',
        'Timestamp mapping',
        'Duration calculation'
      ]
    },
    {
      number: 17,
      title: 'Avatar Selection',
      description: 'Picks today\'s avatar based on day-of-week schedule',
      icon: UserCircle,
      details: [
        'Casual (Mon/Tue)',
        'Professional (Wed/Thu)',
        'Traditional (Fri)',
        'Party (Sat/Sun)'
      ]
    },
    {
      number: 18,
      title: 'Generate Thumbnails',
      description: 'Leonardo.AI creates 3 thumbnail options in multiple styles',
      icon: Image,
      cost: '$0.08',
      details: [
        '3 options: face-forward, action, minimalist',
        'Resolution: 1792x1024',
        'Mode: PhotoReal',
        'Preset: Cinematic'
      ]
    },
    {
      number: 19,
      title: 'HeyGen Avatar Video',
      description: 'Generates speaking avatar clips with emotion control and lip-sync',
      icon: Video,
      cost: '$0.60',
      details: [
        'Emotion control',
        'Lip-sync accuracy',
        'Script sections marked for avatar',
        'Output: MP4 clips'
      ]
    },
    {
      number: 20,
      title: 'Sora 2 B-roll',
      description: 'Main cinematic B-roll generation with text/image to video',
      icon: Film,
      cost: '$2.50',
      details: [
        'Text/image → video',
        '10s clips',
        '4K resolution',
        'Cinematic quality'
      ]
    },
    {
      number: 21,
      title: 'Veo 3.1 B-roll',
      description: 'Secondary B-roll with reference-based, physics-accurate generation',
      icon: Film,
      cost: '$1.80',
      details: [
        'Reference-based generation',
        'Physics-accurate motion',
        'Natural lighting',
        'Consistent style'
      ]
    },
    {
      number: 22,
      title: 'Luma AI Animation',
      description: 'Quick animations for transitions and effects',
      icon: Sparkles,
      cost: '$0.45',
      details: [
        '5s clips',
        'Image → video',
        'Smooth transitions',
        'Motion effects'
      ]
    },
    {
      number: 23,
      title: 'Stock Footage',
      description: 'Pexels API for free B-roll based on keywords (fallback)',
      icon: ImageIcon,
      details: [
        'Source: Pexels API',
        'Keyword-based search',
        'Free licensing',
        'Fallback option'
      ]
    },
    {
      number: 24,
      title: 'CHECKPOINT 2',
      description: 'Preview all generated clips with quality scores for approval',
      icon: StopCircle,
      isCheckpoint: true,
      checkpointActions: ['Approve All', 'Reject', 'Regenerate'],
      details: [
        'Preview all clips',
        'Quality scores display',
        'Individual clip actions',
        'Workflow pauses for review'
      ]
    },
    {
      number: 25,
      title: 'Asset Collection',
      description: 'Organizes all approved assets with metadata for assembly',
      icon: FolderOpen,
      details: [
        'Avatar clips organized',
        'B-roll sorted by type',
        'Thumbnails ready',
        'Audio files prepared',
        'Metadata attached'
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
          <div className="section-icon bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">Section D: Visual Generation</h2>
              <span className="node-badge bg-pink-500/20 text-pink-400">Nodes 16-25</span>
              <span className="checkpoint-badge">🛑 1 Checkpoint</span>
            </div>
            <p className="text-sm text-dark-400 mt-1">
              Scene breakdown, avatar, thumbnails, B-roll, animations, and asset collection
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
            {/* Parallel Processing Note */}
            <div className="px-6 pb-4">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-blue-400">
                  <span className="font-semibold">⚡ Parallel Processing:</span> Nodes 20-22 (Sora, Veo, Luma) run simultaneously for faster generation
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    cost={node.cost}
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
