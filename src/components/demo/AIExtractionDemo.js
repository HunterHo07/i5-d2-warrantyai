'use client';

import { useState, useEffect } from 'react';
import { Brain, Check, Zap, Eye, Calendar, DollarSign, Package, Shield } from 'lucide-react';
import { demoUploadSimulation } from '@/data/demoData';

const AIExtractionDemo = ({ onComplete, isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [extractedData, setExtractedData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const processingSteps = demoUploadSimulation.steps;
  const finalData = demoUploadSimulation.extractedData;

  useEffect(() => {
    if (isActive && !isProcessing) {
      startExtraction();
    }
  }, [isActive]);

  const startExtraction = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setExtractedData({});
    setConfidence(0);

    // Process each step
    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration));
      setCurrentStep(i + 1);
      
      // Gradually reveal extracted data
      if (i >= 2) { // After OCR Analysis
        const progress = (i - 2) / (processingSteps.length - 3);
        const dataKeys = Object.keys(finalData);
        const revealedKeys = dataKeys.slice(0, Math.ceil(dataKeys.length * progress));
        
        const partialData = {};
        revealedKeys.forEach(key => {
          if (key !== 'confidence') {
            partialData[key] = finalData[key];
          }
        });
        setExtractedData(partialData);
        setConfidence(Math.min(finalData.confidence * progress, finalData.confidence));
      }
    }

    // Final reveal
    setExtractedData(finalData);
    setConfidence(finalData.confidence);
    setIsProcessing(false);
    
    // Auto-complete after showing results
    setTimeout(() => {
      onComplete && onComplete();
    }, 2000);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setExtractedData({});
    setIsProcessing(false);
    setConfidence(0);
  };

  const getStepIcon = (step, index) => {
    if (index < currentStep) return <Check className="w-4 h-4 text-accent" />;
    if (index === currentStep - 1) return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
    return <div className="w-4 h-4 border-2 border-white/30 rounded-full" />;
  };

  const dataFields = [
    { key: 'retailer', label: 'Retailer', icon: <Package className="w-4 h-4" />, color: 'primary' },
    { key: 'date', label: 'Purchase Date', icon: <Calendar className="w-4 h-4" />, color: 'secondary' },
    { key: 'total', label: 'Total Amount', icon: <DollarSign className="w-4 h-4" />, color: 'accent' },
    { key: 'product', label: 'Product', icon: <Package className="w-4 h-4" />, color: 'primary' },
    { key: 'model', label: 'Model', icon: <Eye className="w-4 h-4" />, color: 'secondary' },
    { key: 'serialNumber', label: 'Serial Number', icon: <Zap className="w-4 h-4" />, color: 'accent' },
    { key: 'warranty', label: 'Warranty', icon: <Shield className="w-4 h-4" />, color: 'primary' }
  ];

  return (
    <div className="space-y-6">
      {/* Demo Instructions */}
      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
        <h3 className="font-semibold text-secondary mb-2">🧠 AI Extraction Demo</h3>
        <p className="text-white/80 text-sm">
          Watch our advanced AI analyze a receipt and extract warranty information with high accuracy. 
          The system uses OCR, machine learning, and pattern recognition.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Processing Steps */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">AI Processing Pipeline</h4>
          
          <div className="space-y-3">
            {processingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                  index < currentStep
                    ? 'border-accent/30 bg-accent/10'
                    : index === currentStep - 1
                    ? 'border-primary/30 bg-primary/10'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                <div className="flex-shrink-0">
                  {getStepIcon(step, index)}
                </div>
                <div className="flex-1">
                  <div className={`font-medium text-sm ${
                    index < currentStep ? 'text-accent' : 
                    index === currentStep - 1 ? 'text-primary' : 'text-white/70'
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-white/60">
                    {index < currentStep ? 'Completed' : 
                     index === currentStep - 1 ? 'Processing...' : 'Pending'}
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  {step.duration}ms
                </div>
              </div>
            ))}
          </div>

          {/* Confidence Meter */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Confidence Score</span>
              <span className="text-sm font-bold text-primary">{confidence.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <div className="text-xs text-white/60 mt-1">
              {confidence >= 95 ? 'Excellent' : 
               confidence >= 85 ? 'Very Good' : 
               confidence >= 75 ? 'Good' : 'Processing...'}
            </div>
          </div>
        </div>

        {/* Extracted Data */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Extracted Information</h4>
          
          <div className="space-y-3">
            {dataFields.map((field) => (
              <div
                key={field.key}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-500 ${
                  extractedData[field.key]
                    ? `border-${field.color}/30 bg-${field.color}/10`
                    : 'border-white/20 bg-white/5'
                }`}
              >
                <div className={`flex-shrink-0 ${
                  extractedData[field.key] ? `text-${field.color}` : 'text-white/40'
                }`}>
                  {field.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white/70 mb-1">
                    {field.label}
                  </div>
                  <div className={`text-sm ${
                    extractedData[field.key] ? 'text-white' : 'text-white/40'
                  }`}>
                    {extractedData[field.key] || 'Analyzing...'}
                  </div>
                </div>
                {extractedData[field.key] && (
                  <Check className={`w-4 h-4 text-${field.color}`} />
                )}
              </div>
            ))}
          </div>

          {/* Sample Receipt Preview */}
          <div className="bg-white/5 rounded-lg p-4">
            <h5 className="font-medium text-white mb-3">Sample Receipt</h5>
            <div className="bg-white rounded-lg p-4 text-black text-xs font-mono">
              <div className="text-center mb-3">
                <div className="font-bold">🍎 Apple Store</div>
                <div>Cupertino, CA</div>
              </div>
              <div className="border-t border-gray-300 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>iPhone 15 Pro</span>
                  <span>$999.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Model: A3108</span>
                  <span></span>
                </div>
                <div className="flex justify-between">
                  <span>Serial: F2LW48XHQM</span>
                  <span></span>
                </div>
                <div className="border-t border-gray-300 pt-1 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>$999.99</span>
                  </div>
                </div>
                <div className="text-center mt-2 text-xs">
                  <div>Date: 2024-01-15</div>
                  <div>Warranty: 1 Year Limited</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={resetDemo}
          disabled={isProcessing}
          className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Restart Analysis
        </button>
        
        <div className="flex items-center space-x-3">
          {!isProcessing && currentStep === processingSteps.length && (
            <div className="flex items-center space-x-2 text-accent">
              <Check className="w-4 h-4" />
              <span className="text-sm">Extraction Complete!</span>
            </div>
          )}
          
          <button
            onClick={() => onComplete && onComplete()}
            disabled={isProcessing || currentStep < processingSteps.length}
            className="px-6 py-2 bg-gradient-to-r from-secondary to-primary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIExtractionDemo;
