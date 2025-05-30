'use client';

import { useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import DemoLevelSelector from '@/components/demo/DemoLevelSelector';
import ReceiptUploadDemo from '@/components/demo/ReceiptUploadDemo';
import AIExtractionDemo from '@/components/demo/AIExtractionDemo';
import DashboardDemo from '@/components/demo/DashboardDemo';
import ReminderSystemDemo from '@/components/demo/ReminderSystemDemo';
import Inventory3DDemo from '@/components/demo/Inventory3DDemo';
import ClaimAssistantDemo from '@/components/demo/ClaimAssistantDemo';
import FullWorkflowDemo from '@/components/demo/FullWorkflowDemo';

export default function DemoPage() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);

  const demoLevels = [
    {
      id: 1,
      title: "Receipt Upload",
      description: "Experience our AI-powered receipt scanning",
      component: ReceiptUploadDemo,
      difficulty: "Beginner",
      duration: "2 min"
    },
    {
      id: 2,
      title: "AI Extraction",
      description: "Watch AI extract warranty information",
      component: AIExtractionDemo,
      difficulty: "Beginner",
      duration: "3 min"
    },
    {
      id: 3,
      title: "Dashboard Navigation",
      description: "Explore the warranty management dashboard",
      component: DashboardDemo,
      difficulty: "Intermediate",
      duration: "5 min"
    },
    {
      id: 4,
      title: "Smart Reminders",
      description: "See how intelligent notifications work",
      component: ReminderSystemDemo,
      difficulty: "Intermediate",
      duration: "4 min"
    },
    {
      id: 5,
      title: "3D Inventory",
      description: "Visualize your items in 3D space",
      component: Inventory3DDemo,
      difficulty: "Advanced",
      duration: "6 min"
    },
    {
      id: 6,
      title: "Claim Assistant",
      description: "Get guided help with warranty claims",
      component: ClaimAssistantDemo,
      difficulty: "Advanced",
      duration: "7 min"
    },
    {
      id: 7,
      title: "Full Workflow",
      description: "Complete end-to-end warranty management",
      component: FullWorkflowDemo,
      difficulty: "Expert",
      duration: "10 min"
    }
  ];

  const handleLevelComplete = (levelId) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels([...completedLevels, levelId]);
    }
    
    // Auto-advance to next level
    if (levelId < demoLevels.length) {
      setTimeout(() => {
        setCurrentLevel(levelId + 1);
      }, 1500);
    }
  };

  const handleLevelSelect = (levelId) => {
    setCurrentLevel(levelId);
  };

  const currentLevelData = demoLevels.find(level => level.id === currentLevel);
  const CurrentComponent = currentLevelData?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-space via-surface to-space">
      <Navigation />
      
      {/* Demo Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Interactive</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Demo Experience
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Explore WarrantyAI's powerful features through hands-on demonstrations. 
            Each level showcases different aspects of our AI-powered warranty management system.
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Progress</span>
              <span className="text-sm text-white/60">
                {completedLevels.length} / {demoLevels.length} completed
              </span>
            </div>
            <div className="w-full bg-surface/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedLevels.length / demoLevels.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Level Selector Sidebar */}
            <div className="lg:col-span-1">
              <DemoLevelSelector
                levels={demoLevels}
                currentLevel={currentLevel}
                completedLevels={completedLevels}
                onLevelSelect={handleLevelSelect}
              />
            </div>

            {/* Demo Area */}
            <div className="lg:col-span-3">
              <div className="glass rounded-lg border border-white/10 overflow-hidden">
                
                {/* Demo Header */}
                <div className="bg-surface/50 border-b border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-white mb-2">
                        Level {currentLevel}: {currentLevelData?.title}
                      </h2>
                      <p className="text-white/70">
                        {currentLevelData?.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <span className={`px-3 py-1 rounded-full border ${
                          currentLevelData?.difficulty === 'Beginner' ? 'border-accent/30 text-accent' :
                          currentLevelData?.difficulty === 'Intermediate' ? 'border-primary/30 text-primary' :
                          currentLevelData?.difficulty === 'Advanced' ? 'border-secondary/30 text-secondary' :
                          'border-white/30 text-white'
                        }`}>
                          {currentLevelData?.difficulty}
                        </span>
                        <span>⏱️ {currentLevelData?.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Demo Component */}
                <div className="p-6">
                  {CurrentComponent && (
                    <CurrentComponent
                      onComplete={() => handleLevelComplete(currentLevel)}
                      isActive={true}
                    />
                  )}
                </div>
              </div>

              {/* Demo Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => currentLevel > 1 && setCurrentLevel(currentLevel - 1)}
                  disabled={currentLevel === 1}
                  className="px-6 py-3 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-all duration-300"
                >
                  ← Previous Level
                </button>
                
                <div className="flex items-center space-x-2">
                  {demoLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setCurrentLevel(level.id)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        level.id === currentLevel
                          ? 'bg-primary scale-125'
                          : completedLevels.includes(level.id)
                          ? 'bg-accent'
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => currentLevel < demoLevels.length && setCurrentLevel(currentLevel + 1)}
                  disabled={currentLevel === demoLevels.length}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  Next Level →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
