'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import StatsOverview from '@/components/StatsOverview'
import SectionA from '@/components/sections/SectionA'
import SectionB from '@/components/sections/SectionB'
import SectionC from '@/components/sections/SectionC'
import SectionD from '@/components/sections/SectionD'
import WorkflowProgress from '@/components/WorkflowProgress'
import CostTracker from '@/components/CostTracker'

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentNode, setCurrentNode] = useState(0)

  const handleStartWorkflow = () => {
    setIsRunning(true)
    setCurrentNode(1)
    // Simulate workflow progress
    const interval = setInterval(() => {
      setCurrentNode(prev => {
        if (prev >= 25) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1500)
  }

  return (
    <main className="min-h-screen grid-bg">
      <Header isRunning={isRunning} onStart={handleStartWorkflow} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatsOverview currentNode={currentNode} isRunning={isRunning} />
        </motion.div>

        {/* Workflow Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <WorkflowProgress currentNode={currentNode} totalNodes={25} isRunning={isRunning} />
        </motion.div>

        {/* Cost Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <CostTracker currentNode={currentNode} />
        </motion.div>

        {/* Workflow Sections */}
        <div className="mt-12 space-y-8">
          {/* Section A: Setup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SectionA 
              isActive={activeSection === 'A'} 
              currentNode={currentNode}
              onToggle={() => setActiveSection(activeSection === 'A' ? null : 'A')}
            />
          </motion.div>

          {/* Section B: Content Research */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SectionB 
              isActive={activeSection === 'B'} 
              currentNode={currentNode}
              onToggle={() => setActiveSection(activeSection === 'B' ? null : 'B')}
            />
          </motion.div>

          {/* Section C: Script Generation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SectionC 
              isActive={activeSection === 'C'} 
              currentNode={currentNode}
              onToggle={() => setActiveSection(activeSection === 'C' ? null : 'C')}
            />
          </motion.div>

          {/* Section D: Visual Generation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SectionD 
              isActive={activeSection === 'D'} 
              currentNode={currentNode}
              onToggle={() => setActiveSection(activeSection === 'D' ? null : 'D')}
            />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 pb-8 text-center"
        >
          <div className="glass-card p-6 inline-block">
            <p className="text-dark-400 text-sm">
              <span className="text-gradient font-semibold">AI Content Factory</span> — Automated Video Production Pipeline
            </p>
            <p className="text-dark-500 text-xs mt-2">
              65 Nodes • 25-35 min Execution • $4-6/video • 95% Automation
            </p>
          </div>
        </motion.footer>
      </div>
    </main>
  )
}
