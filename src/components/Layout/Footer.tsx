import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import footerData from '../../data/footer.json';
import productsData from '../../data/products.json'
const Footer = () => {
  const getIcon = (iconName: string) => {
    const icons = {
      facebook: Facebook,
      instagram: Instagram,
      twitter: Twitter,
      youtube: Youtube,
    };
    return icons[iconName as keyof typeof icons] || Facebook;
  };

  const productCategories=useMemo(()=>{
    return Array.from(new Set(productsData.map(product => product.category))).sort(() => Math.random() - 0.5).slice(0, 6);
  }, [productsData]);  
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Dumbbell className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                {footerData.brand}
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {footerData.tagline} - Your trusted partner in fitness and wellness.
              Discover premium products designed to help you achieve your goals.
            </p>
            <div className="flex space-x-4">
              {footerData.social.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-500 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {productCategories && productCategories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${category}`}
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>{footerData.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;