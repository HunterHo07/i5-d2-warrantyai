'use client';

import { useState, useEffect } from 'react';
import { FileText, Check, ArrowRight, Download, Upload, MessageCircle } from 'lucide-react';

const ClaimAssistantDemo = ({ onComplete, isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [claimData, setClaimData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const claimSteps = [
    {
      id: 1,
      title: "Select Item",
      description: "Choose the item you want to claim warranty for",
      completed: false
    },
    {
      id: 2,
      title: "Verify Eligibility",
      description: "Check warranty status and claim eligibility",
      completed: false
    },
    {
      id: 3,
      title: "Gather Documents",
      description: "Collect required documentation",
      completed: false
    },
    {
      id: 4,
      title: "Fill Claim Form",
      description: "Complete warranty claim application",
      completed: false
    },
    {
      id: 5,
      title: "Submit Claim",
      description: "Submit claim to manufacturer",
      completed: false
    }
  ];

  useEffect(() => {
    if (isActive) {
      simulateClaimProcess();
    }
  }, [isActive]);

  const simulateClaimProcess = async () => {
    setIsProcessing(true);
    
    for (let i = 0; i < claimSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i + 1);
      
      // Update claim data progressively
      if (i === 0) {
        setClaimData(prev => ({ ...prev, item: "iPhone 15 Pro", serialNumber: "F2LW48XHQM" }));
      } else if (i === 1) {
        setClaimData(prev => ({ ...prev, eligible: true, warrantyStatus: "Active" }));
      } else if (i === 2) {
        setClaimData(prev => ({ ...prev, documents: ["Receipt", "Photos", "Description"] }));
      } else if (i === 3) {
        setClaimData(prev => ({ ...prev, claimNumber: "WC-2024-001234" }));
      }
    }
    
    setIsProcessing(false);
    setTimeout(() => onComplete && onComplete(), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-primary mb-2">📋 Claim Assistant Demo</h3>
        <p className="text-white/80 text-sm">
          Experience our guided warranty claim process. The AI assistant helps you through 
          every step, ensuring you have the best chance of a successful claim.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Progress Steps */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Claim Progress</h4>
          
          <div className="space-y-3">
            {claimSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                  index < currentStep
                    ? 'border-accent/30 bg-accent/10'
                    : index === currentStep
                    ? 'border-primary/30 bg-primary/10'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {index < currentStep ? (
                    <Check className="w-4 h-4 text-accent" />
                  ) : index === currentStep ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-white/30 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-medium text-sm ${
                    index < currentStep ? 'text-accent' : 
                    index === currentStep ? 'text-primary' : 'text-white/70'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-white/60">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Details */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold text-white">
            Step {Math.min(currentStep + 1, claimSteps.length)}: {claimSteps[Math.min(currentStep, claimSteps.length - 1)]?.title}
          </h4>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <h5 className="font-medium text-white">Select Item for Warranty Claim</h5>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 border border-primary/30 bg-primary/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">iPhone 15 Pro</div>
                        <div className="text-sm text-white/70">Serial: F2LW48XHQM</div>
                        <div className="text-sm text-white/70">Warranty: Active (45 days left)</div>
                      </div>
                      <div className="text-primary">Selected</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h5 className="font-medium text-white">Warranty Eligibility Check</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded">
                    <span className="text-white">Warranty Status</span>
                    <span className="text-accent font-medium">✓ Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded">
                    <span className="text-white">Purchase Date Verified</span>
                    <span className="text-accent font-medium">✓ Valid</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded">
                    <span className="text-white">Claim Eligibility</span>
                    <span className="text-accent font-medium">✓ Eligible</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h5 className="font-medium text-white">Required Documents</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 border border-white/20 rounded">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-white">Purchase Receipt</span>
                    </div>
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 border border-white/20 rounded">
                    <div className="flex items-center space-x-3">
                      <Upload className="w-4 h-4 text-primary" />
                      <span className="text-white">Product Photos</span>
                    </div>
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 border border-white/20 rounded">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-white">Issue Description</span>
                    </div>
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h5 className="font-medium text-white">Claim Form Generation</h5>
                <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Claim Number:</span>
                      <span className="text-white font-mono">WC-2024-001234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Product:</span>
                      <span className="text-white">iPhone 15 Pro</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Issue Type:</span>
                      <span className="text-white">Hardware Defect</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Priority:</span>
                      <span className="text-yellow-500">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep >= 4 && (
              <div className="space-y-4">
                <h5 className="font-medium text-white">Claim Submitted Successfully</h5>
                <div className="text-center py-8">
                  <Check className="w-16 h-16 text-accent mx-auto mb-4" />
                  <div className="text-lg font-semibold text-white mb-2">Claim Submitted!</div>
                  <div className="text-white/70 mb-4">
                    Your warranty claim has been submitted to Apple. 
                    You'll receive updates via email and push notifications.
                  </div>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-primary hover:bg-primary/30 transition-all duration-300">
                      <Download className="w-4 h-4 inline mr-2" />
                      Download Claim Receipt
                    </button>
                    <button className="w-full px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-lg text-secondary hover:bg-secondary/30 transition-all duration-300">
                      Track Claim Status
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Assistant Chat */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h5 className="font-medium text-white mb-3">AI Assistant</h5>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              <div className="flex space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs">AI</div>
                <div className="flex-1 bg-primary/10 rounded-lg p-2">
                  <div className="text-sm text-white">
                    {currentStep === 0 && "I've found your iPhone 15 Pro. It's still under warranty. Would you like to proceed with the claim?"}
                    {currentStep === 1 && "Great! Your device is eligible for warranty service. Let me gather the required documents."}
                    {currentStep === 2 && "I've found all your documents in our system. Everything looks good!"}
                    {currentStep === 3 && "I'm generating your claim form with all the details. This will only take a moment."}
                    {currentStep >= 4 && "Perfect! Your claim has been submitted successfully. Apple typically responds within 2-3 business days."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => {
            setCurrentStep(0);
            setClaimData({});
            setIsProcessing(false);
          }}
          className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          Start New Claim
        </button>
        
        <div className="flex items-center space-x-3">
          {currentStep >= claimSteps.length && (
            <div className="flex items-center space-x-2 text-accent">
              <Check className="w-4 h-4" />
              <span className="text-sm">Claim Process Complete!</span>
            </div>
          )}
          
          <button
            onClick={() => onComplete && onComplete()}
            disabled={currentStep < claimSteps.length}
            className="px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Continue to Full Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimAssistantDemo;
