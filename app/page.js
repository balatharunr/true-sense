'use client';

import Image from "next/image";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock } from 'lucide-react';
import AnimatedHeadline, { HeroHeadline, SubHeadline } from '../components/AnimatedHeadline';
import Scanner from '../components/Scanner';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [scanMode, setScanMode] = useState('deepfake'); // 'deepfake' or 'phishing'

  const handleAnalysisStart = (data) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    console.log('Analysis started:', data);
  };

  const handleAnalysisComplete = (result) => {
    setIsAnalyzing(false);
    setAnalysisError(null);
    
    if (result.jobId) {
      // Async job - will be handled by ResultsDisplay polling
      setCurrentJobId(result.jobId);
    } else {
      // Sync result
      setAnalysisResult(result.data);
    }
  };

  const handleAnalysisError = (error) => {
    setIsAnalyzing(false);
    setAnalysisError(error);
    setAnalysisResult(null);
    setCurrentJobId(null);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setAnalysisError(null);
    setCurrentJobId(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        {/* Get Started Button - Moved up by reducing padding above */}
        <div className="flex justify-center mb-20">
          <motion.button 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
            onClick={() => document.getElementById('scanner-section').scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="button_top">Get Started!</span>
          </motion.button>
        </div>

        {/* Feature section or spacer to push scanner down */}
        <div className="py-24 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Powerful AI Detection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield size={24} className="text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Deepfake Detection</h3>
                <p className="text-white/70">Identify AI-generated images and videos with advanced neural networks.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Lock size={24} className="text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Phishing Protection</h3>
                <p className="text-white/70">Detect malicious URLs and protect yourself from online scams.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap size={24} className="text-green-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Instant Analysis</h3>
                <p className="text-white/70">Get results in seconds with our high-performance AI models.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Toggle Button for Deepfake/Phishing - Now further down the page */}
        <div className="flex justify-center mb-6" id="scanner-section">
          <div className="bg-white rounded-full p-1 shadow-md inline-flex">
            <button
              onClick={() => setScanMode('deepfake')}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                scanMode === 'deepfake'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              DEEPFAKE
            </button>
            <button
              onClick={() => setScanMode('phishing')}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                scanMode === 'phishing'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              PHISHING
            </button>
          </div>
        </div>

        <section className="mb-16">
          <Scanner
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleAnalysisError}
            scanMode={scanMode}
          />
        </section>

        {(analysisResult || isAnalyzing || analysisError || currentJobId) && (
          <section>
            <ResultsDisplay
              result={analysisResult}
              loading={isAnalyzing}
              error={analysisError}
              jobId={currentJobId}
              onReset={handleReset}
              scanMode={scanMode}
            />
          </section>
        )}
      </main>
      <footer className="bg-black/10 backdrop-blur-sm py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p className="text-sm">
            Built with ❤️ by TEAM VIBRANT
            
          </p>
        </div>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/homepage/background.png"
          alt="Background network"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4 py-24 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <HeroHeadline className="mb-10" />
          <SubHeadline className="mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-9 text-white/80"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield size={16} />
              <span className="text-sm">Image & text Detection</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap size={16} />
              <span className="text-sm">Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Lock size={16} />
              <span className="text-sm">Privacy Protected</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -top-1/2 -right-1/2 w-96 h-96 border border-white/10 rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/2 -left-1/2 w-96 h-96 border border-white/5 rounded-full" />
      </div>
    </section>
  );
}

