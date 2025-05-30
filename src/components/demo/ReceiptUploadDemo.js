'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Camera, FileText, Check, X, Eye, Brain } from 'lucide-react';

const ReceiptUploadDemo = ({ onComplete, isActive }) => {
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, completed
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Sample receipt images for demo
  const sampleReceipts = [
    { id: 1, name: 'iPhone Receipt', url: '/demo/receipt-iphone.jpg', type: 'Electronics' },
    { id: 2, name: 'Fridge Receipt', url: '/demo/receipt-fridge.jpg', type: 'Appliance' },
    { id: 3, name: 'Laptop Receipt', url: '/demo/receipt-laptop.jpg', type: 'Electronics' }
  ];

  const simulateUpload = useCallback(async (file) => {
    setUploadState('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    setUploadState('processing');
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploadState('completed');
    
    // Auto-complete after showing success
    setTimeout(() => {
      onComplete && onComplete();
    }, 1500);
  }, [onComplete]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  }, []);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      simulateUpload(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSampleSelect = (sample) => {
    setSelectedFile({ name: sample.name, type: sample.type });
    setPreviewUrl(sample.url);
    simulateUpload({ name: sample.name });
  };

  const resetDemo = () => {
    setUploadState('idle');
    setUploadProgress(0);
    setSelectedFile(null);
    setPreviewUrl(null);
    setDragActive(false);
  };

  return (
    <div className="space-y-6">
      {/* Demo Instructions */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-primary mb-2">📋 Demo Instructions</h3>
        <p className="text-white/80 text-sm">
          Upload a receipt image or select a sample to see our AI-powered scanning in action. 
          The system will automatically detect and extract warranty information.
        </p>
      </div>

      {/* Upload Area */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* File Upload Zone */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Upload Receipt</h4>
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-primary bg-primary/10'
                : uploadState === 'idle'
                ? 'border-white/30 hover:border-primary/50 hover:bg-primary/5'
                : 'border-accent bg-accent/10'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />

            {uploadState === 'idle' && (
              <>
                <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                <p className="text-white/80 mb-2">Drag & drop your receipt here</p>
                <p className="text-white/60 text-sm mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary/20 hover:bg-primary/30 border border-primary/30 px-6 py-2 rounded-lg text-primary transition-all duration-300"
                >
                  Browse Files
                </button>
              </>
            )}

            {uploadState === 'uploading' && (
              <>
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/80 mb-2">Uploading...</p>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-white/60 text-sm">{uploadProgress}% complete</p>
              </>
            )}

            {uploadState === 'processing' && (
              <>
                <Brain className="w-12 h-12 text-secondary mx-auto mb-4 animate-pulse" />
                <p className="text-white/80 mb-2">AI Processing...</p>
                <p className="text-white/60 text-sm">Extracting warranty information</p>
              </>
            )}

            {uploadState === 'completed' && (
              <>
                <Check className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-accent mb-2">Upload Successful!</p>
                <p className="text-white/60 text-sm">Receipt processed and analyzed</p>
              </>
            )}
          </div>

          {/* Sample Receipts */}
          <div>
            <h5 className="font-semibold text-white mb-3">Try Sample Receipts</h5>
            <div className="grid grid-cols-1 gap-2">
              {sampleReceipts.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample)}
                  disabled={uploadState !== 'idle'}
                  className="flex items-center space-x-3 p-3 border border-white/20 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="text-white text-sm font-medium">{sample.name}</div>
                    <div className="text-white/60 text-xs">{sample.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Preview</h4>
          
          <div className="border border-white/20 rounded-lg p-4 h-80 flex items-center justify-center bg-white/5">
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Receipt preview"
                  className="w-full h-full object-contain rounded"
                />
                <button className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="w-12 h-12 text-white/40 mx-auto mb-2" />
                <p className="text-white/60">No image selected</p>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="space-y-2">
              <h5 className="font-semibold text-white text-sm">File Details</h5>
              <div className="bg-white/5 rounded-lg p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Name:</span>
                  <span className="text-white">{selectedFile.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Type:</span>
                  <span className="text-white">{selectedFile.type || 'Sample Image'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Status:</span>
                  <span className={`${
                    uploadState === 'completed' ? 'text-accent' : 
                    uploadState === 'processing' ? 'text-secondary' :
                    uploadState === 'uploading' ? 'text-primary' : 'text-white'
                  }`}>
                    {uploadState === 'completed' ? 'Processed' : 
                     uploadState === 'processing' ? 'Processing' :
                     uploadState === 'uploading' ? 'Uploading' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={resetDemo}
          className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          Reset Demo
        </button>
        
        <div className="flex items-center space-x-3">
          {uploadState === 'completed' && (
            <div className="flex items-center space-x-2 text-accent">
              <Check className="w-4 h-4" />
              <span className="text-sm">Level Complete!</span>
            </div>
          )}
          
          <button
            onClick={() => onComplete && onComplete()}
            disabled={uploadState !== 'completed'}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Continue to Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptUploadDemo;
