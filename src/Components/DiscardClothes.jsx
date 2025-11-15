import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence,useScroll, useTransform  } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
function DiscardClothes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFirstChoice, setShowFirstChoice] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = useRef(0);
  const { scrollYProgress } = useScroll();
 const navigate = useNavigate();
  // move text from 0px → 1000px while scrolling
  const moveDown = useTransform(scrollYProgress, [0, 1], [0, 1600]);
  // Bundle of clothes - add more as needed
  const clothingItems = [
    { id: 1, name: "Denim Jacket", type: "jacket", emoji: "🧥", color: "from-blue-400 to-blue-600",path:"/img/tshirt1.jpeg" },
    { id: 2, name: "Summer Dress", type: "dress", emoji: "👗", color: "from-pink-400 to-pink-600",path:"/img/tshirt2.jpeg" },
    { id: 3, name: "Hoodie", type: "hoodie", emoji: "🧥", color: "from-gray-400 to-gray-600",path:"/img/tshirt3.jpeg" },
    { id: 4, name: "Jeans", type: "pants", emoji: "👖", color: "from-indigo-400 to-indigo-600" ,path:"/img/tshirt4.jpeg"},
    { id: 5, name: "Sneakers", type: "shoes", emoji: "👟", color: "from-green-400 to-green-600",path:"/img/tshirt5.jpeg" },
  ];

  // Calculate total scroll height needed
  const scrollHeightPerCard = 400; // pixels to scroll per card
  const totalScrollHeight = (clothingItems.length + 1) * scrollHeightPerCard;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Only process if scrolling down
      if (scrollDelta > 0) {
        scrollThreshold.current += scrollDelta;

        // Move to next card every 400px of scroll
        if (scrollThreshold.current >= scrollHeightPerCard) {
          if (currentIndex < clothingItems.length - 1) {
            setCurrentIndex(prev => prev + 1);
            scrollThreshold.current = 0;
          } else if (!showFirstChoice) {
            // Show first choice after last card
            setShowFirstChoice(true);
            scrollThreshold.current = 0;
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const handleKeyDown = (e) => {
      if (!showFirstChoice && e.key === 'ArrowDown') {
        e.preventDefault();
        handleDiscard();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, showFirstChoice, clothingItems.length, scrollHeightPerCard]);

  const handleDiscard = () => {
    if (currentIndex === clothingItems.length - 1) {
      setTimeout(() => setShowFirstChoice(true), 500);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" 
>
      {/* Spacer to create scrollable area */}
      <motion.div style={{ height: `${totalScrollHeight}px` ,y: moveDown  }} className="relative">
        
        {/* Fixed background elements */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
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
          className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* STICKY Clothing Selection Section */}
        <div className="sticky top-0 z-20 h-screen flex flex-col items-center justify-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
          >
            Find Your Style
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-purple-200 mb-8 text-center"
          >
            Scroll down or press ↓ to browse through items
          </motion.p>

          {/* Card Stack */}
          <div className="relative w-80 h-96 mb-8">
            <AnimatePresence mode="wait">
              {!showFirstChoice && clothingItems.map((item, index) => {
                if (index < currentIndex) return null;

                const isTop = index === currentIndex;
                const offset = (index - currentIndex) * 4;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.8, rotate: 0, opacity: 0 }}
                    animate={{
                      scale: isTop ? 1 : 0.95,
                      rotate: isTop ? 0 : 0,
                      y: offset,
                      opacity: 1,
                      zIndex: clothingItems.length - index,
                    }}
                    exit={{
                      x: Math.random() > 0.5 ? 400 : -400,
                      rotate: Math.random() * 40 - 20,
                      opacity: 0,
                      transition: { duration: 0.4, ease: 'easeInOut' }
                    }}
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center cursor-pointer`}
                    style={{ 
                      pointerEvents: isTop ? 'auto' : 'none',
                    }}
                  >
                    <div className="text-8xl mb-4"><img src={item.path} alt={item.name} /></div>
                    <h3 className="text-3xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-white/80 uppercase tracking-wide text-sm">{item.type}</p>
                  </motion.div>
                );
              })}

              {/* First Choice T-Shirt Reveal */}
              {showFirstChoice && (
                <motion.div
                  key="first-choice"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-yellow-300"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Heart className="absolute top-4 right-4 w-8 h-8 text-white fill-white" />
                  </motion.div>
                  <div className="text-8xl mb-4">👕</div>
                  <h3 className="text-3xl font-bold text-white mb-2">Classic T-Shirt</h3>
                 
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-white/90 text-center mt-4 text-sm"
                  >
                    Perfect blend of comfort and style
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          {!showFirstChoice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDiscard}
                className="bg-purple-500/20 border-2 border-purple-400 text-purple-300 rounded-full p-4 hover:bg-purple-500/30 transition-colors"
              >
                <ChevronDown className="w-8 h-8" />
              </motion.button>
            </motion.div>
          )}

          {showFirstChoice && (
            <motion.button
             onClick={() => navigate("/product")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg"
            >
              Add to Cart
            </motion.button>
          )}

          {/* Progress Indicator */}
          {!showFirstChoice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 flex gap-2"
            >
              {clothingItems.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= currentIndex ? 'bg-purple-400 scale-125' : 'bg-purple-800'
                  }`}
                />
              ))}
            </motion.div>
          )}

          {/* Card counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="absolute top-4 right-4 text-purple-300 text-sm"
          >
            {!showFirstChoice ? `${currentIndex + 1} / ${clothingItems.length}` : 'First Choice! 🎉'}
          </motion.div>

          {/* Scroll progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-purple-300 text-sm flex items-center gap-2"
          >
            <ChevronDown className="w-4 h-4" />
            Keep scrolling
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default DiscardClothes;