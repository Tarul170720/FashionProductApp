import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, Grid, List, Heart, ShoppingCart, 
  Star, X, ChevronLeft, ChevronRight, Sparkles, Zap
} from 'lucide-react';

function CreativeProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  const categories = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Accessories', 'Shoes'];
  
  const products = [
    { id: 1, name: "Eclipse Comfort Tee", category: "T-Shirts", price: 89.99, originalPrice: 129.99, rating: 4.8, reviews: 2847, badge: "Bestseller", path:"/img/tshirt1.jpeg", 
      colors: [
        { name: "Midnight Black", hex: "#1a1a1a" },
        { name: "Ocean Blue", hex: "#2563eb" },
        { name: "Sunset Orange", hex: "#f97316" },
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      images: ["/img/tshirt1.jpeg", "/img/tshirt2.jpeg", "/img/tshirt3.jpeg"],
      description: "Premium comfort tee made from 100% organic cotton"
    },
    { id: 2, name: "Urban Glow Hoodie", category: "Hoodies", price: 149.99, originalPrice: 199.99, rating: 4.9, reviews: 1523, badge: "Trending", path:"/img/tshirt2.jpeg",
      colors: [
        { name: "Midnight Black", hex: "#1a1a1a" },
        { name: "Grey", hex: "#6b7280" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      images: ["/img/tshirt2.jpeg", "/img/tshirt1.jpeg"],
      description: "Stylish hoodie with premium fabric"
    },
    { id: 3, name: "Midnight Rider Jacket", category: "Jackets", price: 299.99, originalPrice: 399.99, rating: 4.7, reviews: 892, badge: "New", path:"/img/tshirt3.jpeg",
      colors: [{ name: "Black", hex: "#000000" }],
      sizes: ["M", "L", "XL"],
      images: ["/img/tshirt3.jpeg"],
      description: "Classic leather jacket"
    },
    { id: 4, name: "Cosmic Runner Shoes", category: "Shoes", price: 179.99, originalPrice: 249.99, rating: 4.6, reviews: 3421, badge: null, path:"/img/tshirt4.jpeg",
      colors: [{ name: "White", hex: "#ffffff" }],
      sizes: ["8", "9", "10", "11"],
      images: ["/img/tshirt4.jpeg"],
      description: "Comfortable running shoes"
    },
    { id: 5, name: "Minimalist Tee", category: "T-Shirts", price: 69.99, originalPrice: 89.99, rating: 4.5, reviews: 1847, badge: null, path:"/img/tshirt5.jpeg",
      colors: [{ name: "White", hex: "#ffffff" }],
      sizes: ["S", "M", "L", "XL"],
      images: ["/img/tshirt5.jpeg"],
      description: "Simple and clean design"
    },
    { id: 6, name: "Street Style Hoodie", category: "Hoodies", price: 129.99, originalPrice: 169.99, rating: 4.8, reviews: 2103, badge: "Popular", path:"/img/tshirt1.jpeg",
      colors: [{ name: "Black", hex: "#000000" }],
      sizes: ["M", "L", "XL"],
      images: ["/img/tshirt1.jpeg"],
      description: "Urban streetwear hoodie"
    },
  ];

  const toggleLike = (productId) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  const getBadgeStyles = (badge) => {
    const styles = {
      'Bestseller': 'bg-amber-50 text-amber-700 border-amber-200',
      'Trending': 'bg-rose-50 text-rose-700 border-rose-200',
      'New': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Popular': 'bg-blue-50 text-blue-700 border-blue-200',
      'Premium': 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return styles[badge] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(0);
    setCurrentImage(0);
    setQuantity(1);
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const handleAddToCart = () => {
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImage((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImage((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900">FashionHub</h2>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">New</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Men</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Women</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Sale</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Heart className="w-5 h-5" />
                {likedProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {likedProducts.length}
                  </span>
                )}
              </button>
              <button className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      <AnimatePresence>
        {showAddedNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center gap-3"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Shop Collection
          </h1>
          <p className="text-gray-600">Discover our latest arrivals and bestsellers</p>
        </motion.div>

        {/* Search & Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6 overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <label className="block mb-3 font-medium text-gray-900">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mb-6 text-sm">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products found
          </p>
          {likedProducts.length > 0 && (
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{likedProducts.length}</span> in wishlist
            </p>
          )}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.03 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={`group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative bg-gray-100 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                  <img 
                    src={product.path} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getBadgeStyles(product.badge)}`}>
                      {product.badge}
                    </div>
                  )}

                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        likedProducts.includes(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {hoveredProduct === product.id && viewMode === 'grid' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      <button 
                        onClick={() => openProductModal(product)}
                        className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                      >
                        Quick View
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-gray-900 text-gray-900'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                          <span className="text-xs font-medium text-red-600">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>

      {/* Product Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeProductModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={closeProductModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left: Images */}
                <div>
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
                    {selectedProduct.badge && (
                      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    <img
                      src={selectedProduct.images[currentImage]}
                      alt={selectedProduct.name}
                      className="w-full aspect-square object-cover"
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-2">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                            currentImage === idx ? 'border-gray-900' : 'border-gray-200'
                          }`}
                        >
                          <img src={img} alt="" className="w-full aspect-square object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-gray-500 uppercase font-semibold">Premium Collection</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedProduct.rating)
                                ? 'fill-gray-900 text-gray-900'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {selectedProduct.rating} ({selectedProduct.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">${selectedProduct.price}</span>
                    <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(idx)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all ${
                            selectedColor === idx ? 'border-gray-900 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{selectedProduct.colors[selectedColor].name}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 rounded-lg font-medium transition-all ${
                            selectedSize === size
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleLike(selectedProduct.id)}
                      className={`p-4 rounded-lg transition-colors ${
                        likedProducts.includes(selectedProduct.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedProducts.includes(selectedProduct.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CreativeProductsPage;