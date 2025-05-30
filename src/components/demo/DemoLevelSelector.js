'use client';

import { Check, Lock, Play } from 'lucide-react';

const DemoLevelSelector = ({ levels, currentLevel, completedLevels, onLevelSelect }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'accent';
      case 'Intermediate': return 'primary';
      case 'Advanced': return 'secondary';
      case 'Expert': return 'white';
      default: return 'white';
    }
  };

  const isLevelUnlocked = (levelId) => {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  };

  return (
    <div className="space-y-4">
      <div className="glass rounded-lg p-4 border border-white/10">
        <h3 className="font-heading text-lg font-bold text-white mb-4">
          Demo Levels
        </h3>
        
        <div className="space-y-3">
          {levels.map((level) => {
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = currentLevel === level.id;
            const isUnlocked = isLevelUnlocked(level.id);
            const difficultyColor = getDifficultyColor(level.difficulty);

            return (
              <button
                key={level.id}
                onClick={() => isUnlocked && onLevelSelect(level.id)}
                disabled={!isUnlocked}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  isCurrent
                    ? 'border-primary bg-primary/10 glow-primary'
                    : isCompleted
                    ? 'border-accent/30 bg-accent/5 hover:border-accent/50'
                    : isUnlocked
                    ? 'border-white/20 hover:border-white/40 hover:bg-white/5'
                    : 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Status Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                    isCompleted
                      ? 'bg-accent text-space'
                      : isCurrent
                      ? 'bg-primary text-space'
                      : isUnlocked
                      ? 'bg-white/10 text-white/60'
                      : 'bg-white/5 text-white/30'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : isCurrent ? (
                      <Play className="w-4 h-4" />
                    ) : isUnlocked ? (
                      <span className="text-xs font-bold">{level.id}</span>
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold text-sm ${
                        isCurrent ? 'text-white' : isUnlocked ? 'text-white/90' : 'text-white/50'
                      }`}>
                        {level.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        isUnlocked 
                          ? `border-${difficultyColor}/30 text-${difficultyColor}`
                          : 'border-white/20 text-white/30'
                      }`}>
                        {level.difficulty}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      isUnlocked ? 'text-white/70' : 'text-white/40'
                    }`}>
                      {level.description}
                    </p>
                    <div className={`text-xs mt-2 ${
                      isUnlocked ? 'text-white/60' : 'text-white/30'
                    }`}>
                      ⏱️ {level.duration}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="glass rounded-lg p-4 border border-white/10">
        <h4 className="font-heading text-sm font-bold text-white mb-3">
          Your Progress
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Completed</span>
            <span className="text-sm font-semibold text-accent">
              {completedLevels.length} / {levels.length}
            </span>
          </div>
          
          <div className="w-full bg-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedLevels.length / levels.length) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="text-center p-2 bg-white/5 rounded">
              <div className="font-semibold text-white">
                {Math.round((completedLevels.length / levels.length) * 100)}%
              </div>
              <div className="text-white/60">Complete</div>
            </div>
            <div className="text-center p-2 bg-white/5 rounded">
              <div className="font-semibold text-white">
                {levels.length - completedLevels.length}
              </div>
              <div className="text-white/60">Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-lg p-4 border border-white/10">
        <h4 className="font-heading text-sm font-bold text-white mb-3">
          Quick Actions
        </h4>
        
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-all duration-300">
            🔄 Reset Progress
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-all duration-300">
            📊 View Analytics
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-all duration-300">
            💾 Save Progress
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-all duration-300">
            🎯 Skip to Level
          </button>
        </div>
      </div>

      {/* Achievement Badges */}
      {completedLevels.length > 0 && (
        <div className="glass rounded-lg p-4 border border-white/10">
          <h4 className="font-heading text-sm font-bold text-white mb-3">
            Achievements
          </h4>
          
          <div className="grid grid-cols-2 gap-2">
            {completedLevels.length >= 1 && (
              <div className="text-center p-2 bg-accent/10 border border-accent/20 rounded">
                <div className="text-lg">🚀</div>
                <div className="text-xs text-accent">First Steps</div>
              </div>
            )}
            {completedLevels.length >= 3 && (
              <div className="text-center p-2 bg-primary/10 border border-primary/20 rounded">
                <div className="text-lg">⚡</div>
                <div className="text-xs text-primary">Quick Learner</div>
              </div>
            )}
            {completedLevels.length >= 5 && (
              <div className="text-center p-2 bg-secondary/10 border border-secondary/20 rounded">
                <div className="text-lg">🎯</div>
                <div className="text-xs text-secondary">Expert</div>
              </div>
            )}
            {completedLevels.length === levels.length && (
              <div className="text-center p-2 bg-white/10 border border-white/20 rounded">
                <div className="text-lg">👑</div>
                <div className="text-xs text-white">Master</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoLevelSelector;
