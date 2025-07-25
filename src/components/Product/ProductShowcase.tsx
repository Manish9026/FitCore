import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Star } from 'lucide-react';
import productsData from '../../data/products.json';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperClass } from "swiper";

const chunkArray = (arr:any, size:number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
};
const GroupedProductSlider = () => {
    const showcaseProducts = productsData
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
    const productGroups = chunkArray(showcaseProducts, 3); // 3 cards per slide
    const swiperRef = useRef<SwiperClass | null>(null);


    const navigate=useNavigate();
    const nextSlide = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    const prevSlide = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const getGradient = (index: number) => {
        const gradients = [
            'from-blue-600 via-blue-700 to-blue-800',
            'from-purple-600 via-purple-700 to-purple-800',
            'from-emerald-600 via-emerald-700 to-emerald-800',
            'from-orange-600 via-orange-700 to-orange-800',
            'from-pink-600 via-pink-700 to-pink-800',
            'from-cyan-600 via-cyan-700 to-cyan-800',
        ];
        return gradients[index % gradients.length];
    };
    return (

        <Swiper
            modules={[Navigation, Pagination, Autoplay]}

            pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet custom-bullet",
                bulletActiveClass: "custom-bullet-active",
            }}
            speed={800} // smooth transition
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // optional
            }}
            spaceBetween={30}
            className='overflow-visiblee py-10 px-5'
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
        >
            <style>
                {`
    .custom-bullet {
      width: 10px;
      height: 10px;
      background: #fff;
      opacity: 0.4;
      border-radius: 9999px;
      margin: 0 6px !important;
      transition: all 0.3s ease;
    }

    .custom-bullet-active {
      width: 12px;
      height: 12px;
      background: #ffffff;
      opacity: 1;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    }
  `}
            </style>


            {productGroups.map((group, groupIndex) => (
                <SwiperSlide key={groupIndex}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        key={"group"+ (groupIndex +1)}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {group.map((product:any, index:number) => (
                            <motion.div
                                key={product?.id ?? product?.title ?? ("product" + index)}
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                                className="group relative will-change-transform flex"
                            >
                                {/* Main Card Container */}
                                <div className={`relative w-full bg-gradient-to-br ${getGradient(index)} rounded-3xl px-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden min-h-[400px] sm:min-h-[450px] flex flex-col`}>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 z-[1]" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

                                    {/* Floating Sparkles */}
                                    <div className="absolute top-4 right-4 z-[50]">
                                        <motion.div
                                            animate={{
                                                rotate: [0, 360],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                                        >
                                            <Sparkles className="h-4 w-4 text-white" />
                                        </motion.div>
                                    </div>

                                    {/* Category Badge */}
                                    <motion.div
                                        initial={{ x: -50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                                        className="inline-flex items-center absolute top-5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-6 w-fit z-[10]"
                                    >
                                        {product.category}
                                    </motion.div>

                                    {/* Product Image Placeholder */}
                                    <motion.div
                                        initial={{ scale: .5, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                                        className="flex-1 relative  top-0 xl:h-60 h-40 aspect-[16/9] left-0 flex items-center justify-center mb-6 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300"
                                    >
                                        <img src={product?.image} alt="" className='absolute top-0 left-0 w-full h-full min-h-40 object-cover z-0' />

                                        {/* <div className="  w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">


                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/30 rounded-xl flex items-center justify-center">
                                                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                                            </div>
                                        </div> */}
                                    </motion.div>

                                    {/* Content Section */}
                                    <div className="space-y-4">
                                        {/* Product Name */}
                                        <motion.h3
                                            initial={{ y: 30, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                                            className="text-xl sm:text-2xl font-bold text-white leading-tight"
                                        >
                                            {product.name}
                                        </motion.h3>

                                        {/* Benefits */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                                            className=" flex gap-2 flex-wrap items-center"
                                        >
                                            {product.benefits.slice(0, 3).map((benefit:any, benefitIndex:number) => (
                                                <motion.div
                                                    key={benefitIndex}
                                                    initial={{ x: -20, opacity: 0 }}
                                                    whileInView={{ x: 0, opacity: 1 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: index * 0.1 + 0.7 + benefitIndex * 0.1,
                                                    }}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                    <span className="text-white/90 text-sm font-medium">
                                                        {benefit}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </motion.div>

                                        {/* Rating */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1 + 0.8,
                                                type: "spring",
                                                stiffness: 150
                                            }}
                                            className="flex items-center space-x-1"
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i}  className="h-4 w-4 text-yellow-400 fill-current" />
                                            ))}
                                            <span className="text-white/80 text-sm ml-2">4.9</span>
                                        </motion.div>

                                        {/* Price and CTA */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 + 0.9 }}
                                            className="flex items-center justify-between pt-4"
                                        >
                                            {/* <div className="text-2xl sm:text-3xl font-bold text-white">
                                                {product.price}
                                            </div> */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all flex items-center space-x-2 relative z-[1000]"
                                                onClick={()=>navigate(`/products?prdName=${product?.name}`,{ state: { productId: product.id } })}
                                            >
                                                <span className="text-sm">View</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </motion.button>
                                        </motion.div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl"
                                    />
                                </div>

                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500 opacity-50" />
                            </motion.div>
                        ))}
                    </motion.div>
                </SwiperSlide>
            ))}

            <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white/30 transition-all"
            >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white/30 transition-all"
            >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
        </Swiper>



    );
};



const ProductShowcase = () => {

    return (
        <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 px-6 py-3 rounded-full mb-6"
                    >
                        <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Featured Products</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Discover Our
                        <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent"> Premium </span>
                        Collection
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Handpicked products designed to elevate your fitness journey with proven results and premium quality.
                    </p>
                </motion.div>







                {/* Products Grid */}
                <GroupedProductSlider />


                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Link to="/products">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 mx-auto"
                        >
                            <span>Explore All Products</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};


export default ProductShowcase;