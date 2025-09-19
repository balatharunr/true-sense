'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, BarChart2, Loader2, RefreshCw } from 'lucide-react';

const ResultsDisplay = ({ result, loading, error, jobId, onReset, scanMode = 'deepfake' }) => {
  const [pollingStatus, setPollingStatus] = useState({ 
    status: jobId ? 'polling' : 'idle',
    progress: 0, 
    result: null 
  });
  
  // Simulate polling for async job results
  useEffect(() => {
    if (!jobId) return;
    
    const interval = setInterval(() => {
      setPollingStatus(prev => {
        // Increment progress
        const newProgress = Math.min(prev.progress + 10, 100);
        
        // If we've reached 100%, simulate completing the job
        if (newProgress === 100 && prev.status === 'polling') {
          clearInterval(interval);
          
          // Return different result formats based on scan mode
          if (scanMode === 'deepfake') {
            return { 
              status: 'completed', 
              progress: 100, 
              result: {
                verdict: Math.random() > 0.6 ? 'fake' : 'real',
                confidence: 70 + Math.random() * 25,
                details: {
                  manipulationScore: Math.floor(Math.random() * 100),
                  inconsistencies: Math.random() > 0.5 ? [
                    'Facial feature anomalies',
                    'Unnatural lighting effects',
                    'Digital artifact patterns'
                  ] : ['Digital artifact patterns']
                }
              }
            };
          } else {
            return { 
              status: 'completed', 
              progress: 100, 
              result: {
                verdict: Math.random() > 0.6 ? 'phishing' : 'legitimate',
                confidence: 70 + Math.random() * 25,
                details: {
                  riskScore: Math.floor(Math.random() * 100),
                  suspicious: Math.random() > 0.5 ? [
                    'Suspicious form submissions',
                    'Domain age less than 3 months',
                    'SSL certificate issues'
                  ] : ['Domain age less than 3 months']
                }
              }
            };
          }
        }
        
        return { ...prev, progress: newProgress };
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [jobId, scanMode]);
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Content</h3>
        <p className="text-gray-600">This might take a few moments...</p>
      </div>
    );
  }
  
  if (jobId && pollingStatus.status === 'polling') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-4">
          <Loader2 size={40} className="text-blue-500 animate-spin" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Processing Analysis</h3>
        <p className="text-gray-600 text-center mb-4">We're analyzing your content...</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${pollingStatus.progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-500 text-right">{pollingStatus.progress}% complete</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Analysis Failed</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onReset}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }
  
  const displayResult = result || pollingStatus.result;
  
  if (!displayResult) return null;
  
  const isDeepfake = displayResult.verdict === 'fake';
  const isPhishing = displayResult.verdict === 'phishing';
  const isSuspicious = isDeepfake || isPhishing;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className={`p-6 ${isSuspicious ? 'bg-red-500' : 'bg-green-500'} text-white`}>
        <div className="flex items-center">
          {isSuspicious ? (
            <XCircle size={24} className="mr-2" />
          ) : (
            <CheckCircle size={24} className="mr-2" />
          )}
          <h2 className="text-xl font-bold">
            {isDeepfake && 'Likely Deepfake Detected'}
            {isPhishing && 'Likely Phishing Detected'}
            {!isSuspicious && 'Content Appears Legitimate'}
          </h2>
        </div>
        <p className="mt-1 opacity-90">
          Confidence: {displayResult.confidence.toFixed(1)}%
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Analysis Details</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            {isDeepfake && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Manipulation Score</span>
                  <span className="text-sm font-bold text-gray-800">
                    {displayResult.details.manipulationScore.toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">Detected Inconsistencies</span>
                  {displayResult.details.inconsistencies && displayResult.details.inconsistencies.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                      {displayResult.details.inconsistencies.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-800">No specific inconsistencies detected, but overall patterns suggest manipulation.</p>
                  )}
                </div>
              </div>
            )}
            
            {isPhishing && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Risk Score</span>
                  <span className="text-sm font-bold text-gray-800">
                    {displayResult.details.riskScore}/100
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">Suspicious Elements</span>
                  {displayResult.details.suspicious && displayResult.details.suspicious.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                      {displayResult.details.suspicious.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-800">No specific suspicious elements detected.</p>
                  )}
                </div>
              </div>
            )}
            
            {!isSuspicious && (
              <div className="text-sm text-gray-800">
                <p>Our analysis found no significant indicators of manipulation or suspicious activity.</p>
                <p className="mt-2 text-gray-500">Note: While this content appears legitimate based on our analysis, always exercise caution online.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={onReset}
            className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
          >
            <RefreshCw size={16} className="mr-2" />
            Start New Analysis
          </button>
          
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
            <BarChart2 size={16} className="mr-2" />
            View Detailed Report
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;