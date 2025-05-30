'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Zap, FileText, Camera, Bell } from 'lucide-react';

const AITerminal = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef(null);

  const commands = [
    {
      command: 'scan receipt.jpg',
      output: [
        'Analyzing receipt...',
        'Product: iPhone 15 Pro',
        'Brand: Apple',
        'Purchase Date: 2024-01-15',
        'Warranty: 1 year (expires 2025-01-15)',
        '✓ Added to warranty tracker'
      ],
      icon: <Camera className="w-4 h-4" />
    },
    {
      command: 'check warranties',
      output: [
        'Scanning warranty database...',
        '📱 iPhone 15 Pro - 11 months remaining',
        '💻 MacBook Pro - 8 months remaining',
        '🏠 Samsung Fridge - 2 years remaining',
        '⚠️  3 items expiring in 30 days'
      ],
      icon: <FileText className="w-4 h-4" />
    },
    {
      command: 'set reminder AC filter',
      output: [
        'Creating smart reminder...',
        'Reminder: Replace AC filter',
        'Frequency: Every 3 months',
        'Next due: March 15, 2024',
        '✓ Reminder activated'
      ],
      icon: <Bell className="w-4 h-4" />
    }
  ];

  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-demo cycle
  useEffect(() => {
    const runDemo = async () => {
      if (currentCommandIndex >= commands.length) {
        // Reset after all commands
        setTimeout(() => {
          setOutput([]);
          setCurrentCommandIndex(0);
        }, 3000);
        return;
      }

      const cmd = commands[currentCommandIndex];
      setIsTyping(true);
      
      // Type command
      for (let i = 0; i <= cmd.command.length; i++) {
        setCurrentCommand(cmd.command.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Execute command
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentCommand('');
      
      // Show output line by line
      for (let i = 0; i < cmd.output.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setOutput(prev => [...prev, {
          type: 'output',
          text: cmd.output[i],
          timestamp: Date.now()
        }]);
      }

      setIsTyping(false);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentCommandIndex(prev => prev + 1);
    };

    const timer = setTimeout(runDemo, 1000);
    return () => clearTimeout(timer);
  }, [currentCommandIndex]);

  const handleCommandClick = (cmdIndex) => {
    setCurrentCommandIndex(cmdIndex);
    setOutput([]);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Terminal Window */}
      <div className="glass rounded-lg overflow-hidden border border-primary/20 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface/50 border-b border-primary/20">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <Terminal className="w-4 h-4 text-primary ml-4" />
            <span className="text-sm font-mono text-white/80">WarrantyAI Terminal v2.0</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <span className="text-xs text-accent font-mono">ONLINE</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="p-6 h-80 overflow-y-auto font-mono text-sm bg-gradient-to-b from-space/80 to-surface/80"
        >
          {/* Welcome Message */}
          <div className="text-accent mb-4">
            <div>Welcome to WarrantyAI Terminal</div>
            <div className="text-white/60">Type commands or click suggestions below</div>
            <div className="text-primary">{'>'} Ready for input...</div>
          </div>

          {/* Output History */}
          {output.map((line, index) => (
            <div key={index} className="mb-1">
              {line.type === 'output' && (
                <div className="text-white/80 pl-4">{line.text}</div>
              )}
            </div>
          ))}

          {/* Current Command Line */}
          <div className="flex items-center text-primary">
            <span className="mr-2">{'>'}</span>
            <span>{currentCommand}</span>
            {showCursor && <span className="bg-primary w-2 h-4 ml-1 animate-pulse">|</span>}
          </div>
        </div>

        {/* Command Suggestions */}
        <div className="p-4 bg-surface/30 border-t border-primary/20">
          <div className="text-xs text-white/60 mb-2">Quick Commands:</div>
          <div className="flex flex-wrap gap-2">
            {commands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => handleCommandClick(index)}
                className="flex items-center space-x-2 px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded border border-primary/30 transition-all duration-300 text-xs text-white/80 hover:text-white"
              >
                {cmd.icon}
                <span>{cmd.command}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-4">
        <button className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-110 group">
          <Play className="w-5 h-5 text-white group-hover:text-space" />
        </button>
        <button className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-accent/25 transition-all duration-300 transform hover:scale-110 group">
          <Zap className="w-5 h-5 text-white group-hover:text-space" />
        </button>
      </div>
    </div>
  );
};

export default AITerminal;
