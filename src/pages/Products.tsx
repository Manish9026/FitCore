import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, ShoppingBag, Heart, Eye, CheckCircle, ShoppingCart } from 'lucide-react';
import productsData from '../data/products.json';

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
};

type Product = {
  id: string | number;
  name: string;
  description: string;
  image: string;
  category: string;
  benefits: string[];
  price: string | number;
  // Add other fields as needed
};

interface ProductCardProps {
  product: Product;
  index: number;
}


const ProductCard = ({ product, index }: ProductCardProps) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-700 transform overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 dark:from-gray-800/40 dark:via-gray-900/50 dark:to-gray-800/30" />

      {/* Floating Shapes */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-700 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="absolute top-8 right-8 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-500 dark:to-red-600 transform rotate-45 opacity-15 group-hover:opacity-30 transition-all duration-500 group-hover:rotate-90" />
      <div className="absolute bottom-6 left-4 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-full opacity-10 group-hover:opacity-25 transition-opacity duration-500" />

      {/* Corner Cuts */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/80 to-purple-600/80 dark:from-blue-700/80 dark:to-purple-700/80 transform rotate-45 translate-x-6 -translate-y-6 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-teal-400/60 to-emerald-500/60 dark:from-teal-600/60 dark:to-emerald-600/60 rounded-full -translate-x-4 translate-y-4 group-hover:scale-125 transition-transform duration-500" />

      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 dark:from-blue-700/30 dark:via-purple-700/30 dark:to-teal-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Image */}
      <div className="relative overflow-hidden h-64 xl:h-40 rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/40 dark:via-black/20 z-10" />
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 brightness-110' : 'scale-100'
            }`}
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg border border-white/20 dark:border-white/10 z-20">
          {product.category}
        </div>

        {/* Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute z-[100] top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg border border-white/20 dark:border-white/10 z-20 ${isLiked
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white scale-110'
              : 'bg-white/30 dark:bg-white/10 text-white hover:bg-white/40 dark:hover:bg-white/20 hover:scale-105'
            }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-blue-600/30 via-purple-500/20 to-transparent dark:from-blue-700/40 dark:via-purple-600/30 transition-all duration-500 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`} />

        {/* Hover Button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
          <button className="bg-white/90 dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-white/50 dark:border-white/20">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative z-30 bg-white/95 dark:bg-gray-800 backdrop-blur-sm">
        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {product.description}
        </p>

        {/* Benefits */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.benefits.slice(0, 2).map((benefit, benefitIndex) => (
              <span
                key={benefitIndex}
                className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 border border-emerald-100 dark:border-emerald-800 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                style={{
                  transitionDelay: `${(index * 150) + (benefitIndex * 100)}ms`
                }}
              >
                <CheckCircle className="w-3 h-3" />
                {benefit}
              </span>
            ))}
            {product.benefits.length > 2 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full">
                +{product.benefits.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-200">
            {product.price}
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full border border-yellow-100 dark:border-yellow-800">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
            ))}
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1 font-medium">(4.8)</span>
          </div>
        </div>

        {/* View Details Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 group relative overflow-hidden border border-white/20 dark:border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <ShoppingCart className="w-4 h-4 group-hover:animate-pulse relative z-10 transition-transform duration-300 group-hover:scale-110" />
          <span className="relative z-10 text-sm tracking-wide">View Details</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/50 via-purple-400/50 to-teal-400/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </button>
      </div>

      {/* Bottom Accents */}
      <div className="absolute bottom-0 right-0 w-16 h-2 bg-gradient-to-l from-blue-500 via-purple-500 to-teal-500 dark:from-blue-700 dark:via-purple-700 dark:to-teal-700 rounded-tl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500 group-hover:scale-125" />
    </div>
  );
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(productsData.map(product => product.category)))];

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Premium Fitness Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our curated collection of high-quality supplements and equipment
            designed to help you achieve your fitness goals.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group will-change-transform">

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full  px-4 py-3 object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-8"
        >
          {/* {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.8</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {product.price}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))} */}

          {
            filteredProducts.map((product, index) => (<ProductCard product={product} index={index} />))

          }
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;