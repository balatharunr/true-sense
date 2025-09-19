'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Link, Image as ImageIcon, FileText, AlertTriangle, Video, Mail } from 'lucide-react';

const Scanner = ({ onAnalysisStart, onAnalysisComplete, onError, scanMode = 'deepfake' }) => {
  const [activeTab, setActiveTab] = useState(scanMode === 'deepfake' ? 'image' : 'url');
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  
  // Update active tab when scan mode changes
  useEffect(() => {
    // Set default tab based on scan mode
    setActiveTab(scanMode === 'deepfake' ? 'image' : 'url');
  }, [scanMode]);
  
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      onAnalysisStart({ type: activeTab, file: file.name, scanMode });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success response simulation based on scan mode
      if (scanMode === 'deepfake') {
        onAnalysisComplete({
          data: {
            verdict: Math.random() > 0.5 ? 'real' : 'fake',
            confidence: Math.random() * 100,
            details: {
              manipulationScore: Math.random() * 100,
              inconsistencies: Math.random() > 0.7 ? ['facial features', 'lighting'] : [],
            }
          }
        });
      } else {
        onAnalysisComplete({
          data: {
            verdict: Math.random() > 0.5 ? 'safe' : 'phishing',
            confidence: Math.random() * 100,
            details: {
              suspiciousElements: Math.random() > 0.7 ? ['fake login form', 'spoofed domain'] : [],
              riskScore: Math.random() * 100
            }
          }
        });
      }
    } catch (error) {
      onError(error.message || 'Failed to analyze file');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    try {
      setIsUploading(true);
      onAnalysisStart({ type: activeTab, url, scanMode });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success response simulation with job ID for async processing
      onAnalysisComplete({
        jobId: `${scanMode}_job_` + Math.random().toString(36).substring(2, 10)
      });
    } catch (error) {
      onError(error.message || 'Failed to analyze URL');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    try {
      setIsUploading(true);
      onAnalysisStart({ type: activeTab, text, scanMode });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success response simulation
      onAnalysisComplete({
        data: {
          verdict: Math.random() > 0.5 ? 'safe' : 'phishing',
          confidence: Math.random() * 100,
          details: {
            suspiciousElements: Math.random() > 0.7 ? ['suspicious links', 'scam keywords detected'] : [],
            riskScore: Math.random() * 100
          }
        }
      });
    } catch (error) {
      onError(error.message || 'Failed to analyze text');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Define tabs based on scan mode
  const deepfakeTabs = [
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'video', label: 'Video', icon: Video }
  ];
  
  const phishingTabs = [
    { id: 'url', label: 'Website URL', icon: Link },
    { id: 'text', label: 'Mail', icon: Mail }
  ];
  
  const tabs = scanMode === 'deepfake' ? deepfakeTabs : phishingTabs;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`p-6 text-white bg-gradient-to-r from-blue-600 to-cyan-500`}>
        <h2 className="text-2xl font-bold">AI Content Scanner</h2>
        <p className="opacity-90">
          {scanMode === 'deepfake' 
            ? 'Upload image or video to analyze for deepfake manipulations' 
            : 'Enter website URL or mail to check for phishing attempts'}
        </p>
      </div>
      
      <div className="p-6">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 border-b-2 -mb-px font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="mr-2" size={16} />
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter website URL to analyze for phishing
                </label>
                <input
                  type="url"
                  id="url"
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-600"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isUploading || !url.trim()}
                className={`w-full py-2 px-4 rounded-md font-medium ${
                  isUploading || !url.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {isUploading ? 'Analyzing...' : 'Detect Phishing'}
              </button>
            </form>
          )}
          
          {activeTab === 'text' && (
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter email content to analyze for phishing
                </label>
                <textarea
                  id="text"
                  placeholder="Paste suspicious email content here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[120px] text-black placeholder-gray-600"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isUploading || !text.trim()}
                className={`w-full py-2 px-4 rounded-md font-medium ${
                  isUploading || !text.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {isUploading ? 'Analyzing...' : 'Detect Phishing'}
              </button>
            </form>
          )}
          
          {(activeTab === 'image' || activeTab === 'video') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'image' ? 'Upload image to analyze' : 'Upload video to analyze'}
              </label>
              
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleUpload}
                  accept={activeTab === 'image' ? 'image/*' : 'video/*'}
                  disabled={isUploading}
                />
                
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer flex flex-col items-center justify-center ${
                    isUploading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <Upload className="mx-auto h-12 w-12 text-blue-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeTab === 'image' 
                      ? 'PNG, JPG, GIF up to 10MB'
                      : 'MP4, MOV, AVI up to 100MB'}
                  </p>
                </label>
              </div>
              
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;