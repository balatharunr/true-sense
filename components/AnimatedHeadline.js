'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeadline = ({ text, className, gradientWords = [] }) => {
  // Split the text into words
  const words = text.split(' ');
  
  return (
    <h2 className={className}>
      {words.map((word, index) => (
        <span 
          key={index} 
          className={gradientWords.includes(index) ? 
            'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 font-bold' : 
            ''}
        >
          {word}{' '}
        </span>
      ))}
    </h2>
  );
};

export const HeroHeadline = ({ className }) => {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-4xl md:text-6xl font-extrabold text-white leading-tight ${className}`}
    >
      <span className="inline-block">
        Detect
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          {' '}Deepfakes{' '}
        </span>
        &{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Phishing
        </span>
      </span>
      <br />
      <span className="inline-block mt-2">
        <span className="relative">
          <span className="text-red-600 kaushan-script-regular">Ultimate</span>
          <img 
            src="/homepage/underline.png" 
            alt="underline" 
            className="absolute w-full left-0 -bottom-4" 
            style={{ maxWidth: '100%' }} 
          />
        </span>
        <span className="text-white" style={{ fontFamily: 'Times New Roman' }}> Scam Detection</span>
      </span>
    </motion.h1>
  );
};

export const SubHeadline = ({ className }) => {
  return (
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed ${className}`}
    >
      Detect fake images, videos, texts, and links with real-time AI verification.
    </motion.p>
  );
};

export default AnimatedHeadline;