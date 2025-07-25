import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Trophy, Users, Star, CheckCircle } from 'lucide-react';
import BannerSlider from '../components/Banner/BannerSlider';
import ProductShowcase from '../components/Product/ProductShowCase';




const FeatureCard: React.FC<{ feature: any; index: number; }> = ({ feature, index, }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group will-change-transform"
    >
      <div className="mb-4">
        <motion.div
          //  whileInView={{ rotate: 0, scale: 1.1,opacity:1 }}
          animate={isHovered ? { rotate: 8, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <feature.icon onMouseEnter={(e) => e.stopPropagation()} className="h-12 w-12 text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300" />
        </motion.div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 will-change-transform transition-all duration-300">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 will-change-transform transition-all duration-300">
        {feature.description}
      </p>
    </motion.div>
  )
}
const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'Premium Quality',
      description: 'Lab-tested supplements and equipment for maximum effectiveness',
    },
    {
      icon: Shield,
      title: 'Verified Products',
      description: 'Every product comes with a unique verification code for authenticity',
    },
    {
      icon: Trophy,
      title: 'Proven Results',
      description: 'Trusted by athletes and fitness enthusiasts worldwide',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 customer support from certified fitness professionals',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Professional Athlete',
      content: 'FitCore products have transformed my training. The quality is unmatched!',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Fitness Coach',
      content: 'I recommend FitCore to all my clients. Reliable, effective, and authentic.',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Fitness Enthusiast',
      content: 'Amazing results with their supplements. The verification system gives me confidence.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ">
      {/* Banner Slider */}
      <BannerSlider />

  <ProductShowcase />
      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose FitCore?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're committed to providing you with the highest quality fitness products
              and an unmatched customer experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of satisfied customers who trust FitCore
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Browse our complete collection of premium fitness products
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 mx-auto"
              >
                <span>Explore Products</span>
                <CheckCircle className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;