import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle, Shield, AlertTriangle } from 'lucide-react';
import codesData from '../data/codes.json';

const Verify = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const foundCode = codesData.find(item => 
      item.code.toLowerCase() === code.trim().toLowerCase()
    );
    
    if (foundCode) {
      setResult(foundCode);
    } else {
      setResult({
        code: code.trim(),
        valid: false,
        message: '❌ Invalid Code - Product not found in our database',
        product: 'Unknown'
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
            >
              <Shield className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Product Verification
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter your product verification code to confirm authenticity and ensure
            you have a genuine FitCore product.
          </p>
        </motion.div>

        {/* Verification Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Verification Code
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your product code (e.g., FIT2024-VERIFY)"
                  className="w-full pl-12 pr-4 py-4 text-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !code.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Verify Product</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl shadow-xl p-8 ${
                result.valid
                  ? 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`p-4 rounded-full ${
                    result.valid ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  {result.valid ? (
                    <CheckCircle className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
                  result.valid ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  {result.message}
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Code:</span>
                      <p className="font-mono text-lg text-gray-900 dark:text-white">{result.code}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Product:</span>
                      <p className="text-lg text-gray-900 dark:text-white">{result.product}</p>
                    </div>
                  </div>
                </div>

                {!result.valid && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl"
                  >
                    <div className="flex items-center justify-center space-x-2 text-yellow-700 dark:text-yellow-300">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-medium">Security Warning</span>
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                      This code is not in our database. Please verify your product source and contact our support team if you believe this is an error.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample Codes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Try Sample Codes
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Test the verification system with these sample codes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {codesData.filter(item => item.valid).map((item) => (
              <motion.button
                key={item.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCode(item.code)}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-left"
              >
                <div className="font-mono text-sm text-emerald-600 dark:text-emerald-400 mb-1">
                  {item.code}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {item.product}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Verify;