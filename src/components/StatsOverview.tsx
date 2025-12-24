'use client'

import { motion } from 'framer-motion'
import { Boxes, Clock, DollarSign, Cpu, Sparkles, TrendingUp } from 'lucide-react'

interface StatsOverviewProps {
  currentNode: number
  isRunning: boolean
}

export default function StatsOverview({ currentNode, isRunning }: StatsOverviewProps) {
  const stats = [
    {
      label: 'Total Nodes',
      value: '65',
      icon: Boxes,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-500/10',
      change: '+4 new'
    },
    {
      label: 'Execution Time',
      value: '25-35',
      unit: 'min',
      icon: Clock,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      change: 'avg 28m'
    },
    {
      label: 'Cost per Video',
      value: '$4-6',
      icon: DollarSign,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      change: '-15% vs last'
    },
    {
      label: 'Automation',
      value: '95',
      unit: '%',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      change: '5% manual'
    },
    {
      label: 'AI Models',
      value: '6',
      icon: Sparkles,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/10',
      change: 'active'
    },
    {
      label: 'Success Rate',
      value: '98.5',
      unit: '%',
      icon: TrendingUp,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      change: '+2.3%'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass-card p-4 relative overflow-hidden group"
        >
          {/* Background Icon */}
          <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
            <stat.icon className="w-16 h-16" />
          </div>
          
          {/* Icon */}
          <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
            <stat.icon className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('primary') ? '#6366f1' : stat.color.includes('emerald') ? '#10b981' : stat.color.includes('amber') ? '#f59e0b' : stat.color.includes('purple') ? '#a855f7' : stat.color.includes('pink') ? '#ec4899' : '#06b6d4' }} />
          </div>
          
          {/* Value */}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            {stat.unit && <span className="text-sm text-dark-400">{stat.unit}</span>}
          </div>
          
          {/* Label */}
          <p className="text-xs text-dark-400 mt-1">{stat.label}</p>
          
          {/* Change indicator */}
          <span className="text-xs text-dark-500 mt-2 block">{stat.change}</span>
          
          {/* Active indicator when running */}
          {isRunning && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
