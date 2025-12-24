'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Settings, Bell, Zap } from 'lucide-react'

interface HeaderProps {
  isRunning: boolean
  onStart: () => void
}

export default function Header({ isRunning, onStart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-950/80 border-b border-dark-800">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              {isRunning && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-dark-950"
                />
              )}
            </motion.div>
            
            <div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl font-bold text-gradient"
              >
                AI Content Factory
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-dark-400"
              >
                Automated Video Production Workflow
              </motion.p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-dark-400" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
            >
              <Settings className="w-5 h-5 text-dark-400" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                isRunning
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/30'
              }`}
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Pause className="w-4 h-4" />
                  </motion.div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Workflow
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}
