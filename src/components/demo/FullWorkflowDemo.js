'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check, ArrowRight, Zap } from 'lucide-react';

const FullWorkflowDemo = ({ onComplete, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const workflowPhases = [
    {
      id: 1,
      title: "Receipt Upload",
      description: "User uploads iPhone receipt photo",
      duration: 3000,
      steps: ["Photo captured", "Image processed", "OCR completed"]
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "AI extracts warranty information",
      duration: 2500,
      steps: ["Product identified", "Warranty terms extracted", "Data validated"]
    },
    {
      id: 3,
      title: "Dashboard Update",
      description: "Item added to warranty dashboard",
      duration: 2000,
      steps: ["Database updated", "Reminders set", "Categories organized"]
    },
    {
      id: 4,
      title: "Smart Reminders",
      description: "Proactive notifications configured",
      duration: 2000,
      steps: ["Calendar integration", "Email alerts set", "Push notifications enabled"]
    },
    {
      id: 5,
      title: "3D Visualization",
      description: "Item appears in 3D inventory",
      duration: 2500,
      steps: ["3D model generated", "Room placement", "AR preview ready"]
    },
    {
      id: 6,
      title: "Warranty Claim",
      description: "Seamless claim process when needed",
      duration: 3000,
      steps: ["Eligibility verified", "Documents prepared", "Claim submitted"]
    }
  ];

  useEffect(() => {
    if (isActive && !isPlaying) {
      startWorkflow();
    }
  }, [isActive]);

  const startWorkflow = async () => {
    setIsPlaying(true);
    setCurrentPhase(0);
    setProgress(0);

    for (let i = 0; i < workflowPhases.length; i++) {
      setCurrentPhase(i);
      
      // Animate progress for current phase
      const phase = workflowPhases[i];
      const stepDuration = phase.duration / phase.steps.length;
      
      for (let step = 0; step < phase.steps.length; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        setProgress((step + 1) / phase.steps.length * 100);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsPlaying(false);
    setTimeout(() => onComplete && onComplete(), 2000);
  };

  const resetWorkflow = () => {
    setIsPlaying(false);
    setCurrentPhase(0);
    setProgress(0);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      startWorkflow();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-primary mb-2">🚀 Complete Workflow Demo</h3>
        <p className="text-white/80 text-sm">
          Experience the full WarrantyAI journey from receipt upload to warranty claim. 
          This comprehensive demo shows how all features work together seamlessly.
        </p>
      </div>

      {/* Workflow Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={togglePlayback}
          disabled={isPlaying}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isPlaying ? 'Playing...' : 'Start Demo'}</span>
        </button>
        
        <button
          onClick={resetWorkflow}
          className="flex items-center space-x-2 px-4 py-3 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Workflow Visualization */}
      <div className="space-y-6">
        
        {/* Timeline */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {workflowPhases.map((phase, index) => (
              <div key={phase.id} className="flex flex-col items-center relative">
                {/* Phase Circle */}
                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                  index < currentPhase 
                    ? 'border-accent bg-accent text-space' 
                    : index === currentPhase
                    ? 'border-primary bg-primary text-space animate-pulse'
                    : 'border-white/30 bg-white/10 text-white/60'
                }`}>
                  {index < currentPhase ? (
                    <Check className="w-5 h-5" />
                  ) : index === currentPhase ? (
                    <Zap className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                
                {/* Phase Label */}
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    index <= currentPhase ? 'text-white' : 'text-white/60'
                  }`}>
                    {phase.title}
                  </div>
                </div>

                {/* Connector Line */}
                {index < workflowPhases.length - 1 && (
                  <div className={`absolute top-6 left-12 w-24 h-1 transition-all duration-500 ${
                    index < currentPhase ? 'bg-accent' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Phase Details */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white text-lg">
              {workflowPhases[currentPhase]?.title}
            </h4>
            <div className="text-sm text-white/60">
              Phase {currentPhase + 1} of {workflowPhases.length}
            </div>
          </div>
          
          <p className="text-white/80 mb-4">
            {workflowPhases[currentPhase]?.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Progress</span>
              <span className="text-sm text-white/70">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current Steps */}
          <div className="space-y-2">
            {workflowPhases[currentPhase]?.steps.map((step, stepIndex) => {
              const stepProgress = (progress / 100) * workflowPhases[currentPhase].steps.length;
              const isStepComplete = stepIndex < stepProgress;
              const isStepActive = stepIndex < stepProgress + 1 && stepIndex >= stepProgress - 1;

              return (
                <div key={stepIndex} className={`flex items-center space-x-3 p-2 rounded transition-all duration-300 ${
                  isStepComplete ? 'bg-accent/10' : isStepActive ? 'bg-primary/10' : 'bg-white/5'
                }`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isStepComplete ? 'bg-accent' : isStepActive ? 'bg-primary' : 'bg-white/20'
                  }`}>
                    {isStepComplete ? (
                      <Check className="w-3 h-3 text-space" />
                    ) : isStepActive ? (
                      <div className="w-2 h-2 bg-space rounded-full animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    isStepComplete ? 'text-accent' : isStepActive ? 'text-primary' : 'text-white/60'
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <h5 className="font-semibold text-primary mb-2">AI-Powered</h5>
            <p className="text-white/70 text-sm">
              Advanced machine learning extracts warranty information with 99.9% accuracy
            </p>
          </div>
          
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            <h5 className="font-semibold text-secondary mb-2">Fully Automated</h5>
            <p className="text-white/70 text-sm">
              From upload to claim, everything happens automatically in the background
            </p>
          </div>
          
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h5 className="font-semibold text-accent mb-2">Always Connected</h5>
            <p className="text-white/70 text-sm">
              Real-time sync across all devices with cloud backup and security
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-white/70 text-sm">
          Complete workflow demonstration • All features integrated
        </div>
        
        <div className="flex items-center space-x-3">
          {currentPhase >= workflowPhases.length - 1 && !isPlaying && (
            <div className="flex items-center space-x-2 text-accent">
              <Check className="w-4 h-4" />
              <span className="text-sm">All Demos Complete!</span>
            </div>
          )}
          
          <button
            onClick={() => onComplete && onComplete()}
            disabled={isPlaying || currentPhase < workflowPhases.length - 1}
            className="px-6 py-2 bg-gradient-to-r from-accent to-secondary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            Complete Demo Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullWorkflowDemo;
