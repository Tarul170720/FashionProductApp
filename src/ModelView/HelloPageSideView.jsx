import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";
function HelloPageSideView() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 const navigate = useNavigate();
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const title = "Welcome To Fashion App";
  const subtitle = "Fashion is the armor to survive the world";

  return (
    <div >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          x: -mousePosition.x,
          y: -mousePosition.y,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Sparkle decoration */}

        {/* Animated title with letter-by-letter animation */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ 
                  textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle with fade and slide */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-xl md:text-2xl text-purple-200 mb-12 font-light tracking-wide"
        >
          {subtitle}
        </motion.h3>

        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md shadow-2xl"
        >
          <p className="text-purple-100 text-center mb-6 leading-relaxed">
            Discover curated collections, trending styles, and personalized recommendations crafted just for you.
          </p>
          
          {/* CTA Button */}
          <motion.button

            onClick={() => navigate("/product")}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
          >
            Explore Collections
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 3, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 flex flex-col items-center"
        >
          <span className="text-purple-300 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-purple-300" />
        </motion.div>
      </div>


    </div>
  );
}

export default HelloPageSideView;