import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, Zap, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';

function CreativeProductPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  const product = {
    name: "Eclipse Comfort Tee",
    tagline: "Where style meets serenity",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 2847,
    colors: [
      { name: "Midnight Black", hex: "#1a1a1a", image: "🌑" },
      { name: "Ocean Blue", hex: "#2563eb", image: "🌊" },
      { name: "Sunset Orange", hex: "#f97316", image: "🌅" },
      { name: "Forest Green", hex: "#16a34a", image: "🌲" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      { icon: "✨", title: "Premium Cotton", desc: "100% organic Egyptian cotton" },
      { icon: "🌊", title: "Moisture Wicking", desc: "Stays dry all day" },
      { icon: "♻️", title: "Eco-Friendly", desc: "Sustainable production" },
      { icon: "🎨", title: "Fade Resistant", desc: "Colors stay vibrant" },
    ],
    images: ["👕", "👔", "🎽", "🧥"],
  };

  const customerReviews = [
    { name: "Alex M.", rating: 5, text: "Best t-shirt I've ever owned. The fabric is incredibly soft!", date: "2 days ago" },
    { name: "Sarah K.", rating: 5, text: "Perfect fit and amazing quality. Worth every penny!", date: "1 week ago" },
    { name: "Mike D.", rating: 4, text: "Great shirt, runs slightly large but still love it.", date: "2 weeks ago" },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAddToCart = () => {
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-x-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showAddedNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Image Gallery */}
          <div className="relative">
            {/* Floating badge */}
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-full shadow-xl"
            >
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 fill-current" />
                31% OFF
              </div>
            </motion.div>

            {/* Main product image */}
            <motion.div
              style={{
                rotateY: mousePos.x * 0.1,
                rotateX: -mousePos.y * 0.1,
              }}
              className="relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20 shadow-2xl"
            >
              <motion.div
                key={currentImage}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="text-9xl flex justify-center"
                style={{ filter: `hue-rotate(${selectedColor * 45}deg)` }}
              >
                {product.images[currentImage]}
              </motion.div>

              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Thumbnail gallery */}
            <div className="flex gap-3 mt-6 justify-center">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-4xl p-4 rounded-xl transition-all ${
                    currentImage === idx
                      ? 'bg-purple-600/50 border-2 border-purple-400'
                      : 'bg-white/5 border-2 border-transparent hover:border-purple-600/50'
                  }`}
                >
                  {img}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-purple-300 uppercase text-sm font-semibold tracking-wider">Premium Collection</span>
              </div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {product.name}
              </h1>
              <p className="text-xl text-purple-200 italic mb-4">{product.tagline}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-white font-semibold">{product.rating}</span>
                </div>
                <span className="text-purple-300">({product.reviews.toLocaleString()} reviews)</span>
              </div>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-baseline gap-4"
            >
              <span className="text-5xl font-bold text-white">${product.price}</span>
              <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </motion.div>

            {/* Color Selection */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative w-16 h-16 rounded-xl overflow-hidden transition-all ${
                      selectedColor === idx
                        ? 'ring-4 ring-purple-400 ring-offset-2 ring-offset-slate-950'
                        : 'ring-2 ring-white/20 hover:ring-white/40'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="text-2xl">{color.image}</span>
                    {selectedColor === idx && (
                      <motion.div
                        layoutId="colorCheck"
                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                      >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-black rounded-full" />
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              <p className="text-sm text-purple-300">{product.colors[selectedColor].name}</p>
            </motion.div>

            {/* Size Selection */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="text-lg font-semibold">Quantity</span>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 pt-4"
            >
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-purple-600/50 flex items-center justify-center gap-3 text-lg transition-all"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </motion.button>
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-5 rounded-xl transition-all ${
                  isLiked
                    ? 'bg-pink-600 text-white'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {product.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 hover:bg-white/10 transition-all"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-purple-300">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Customer Reviews</h2>
            <button
              onClick={() => setReviewsExpanded(!reviewsExpanded)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {reviewsExpanded ? 'Show Less' : 'View All'}
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {customerReviews.slice(0, reviewsExpanded ? customerReviews.length : 3).map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-purple-300">{review.date}</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-purple-200">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CreativeProductPage;