import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import all the images you want in the slideshow
import img1 from '../assets/Images/img-1.jpg';
import img2 from '../assets/Images/img-2.jpg';
import img3 from '../assets/Images/img-3.jpg';
import imgA from '../assets/Images/a.png.jpg'; // Example of using other images
import imgB from '../assets/Images/b.png.jpg';
import imgC from '../assets/Images/c.png.jpg';

const images = [img1, img2, img3, imgA, imgB, imgC]; // Add or remove images here

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // This creates the loop for the slideshow
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Image Slideshow using Framer Motion */}
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt="Food donation activities"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.5 } }}
          exit={{ opacity: 0, transition: { duration: 1.5 } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Centered Text and Button */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
        >
          Nourish Your Community
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.5 } }}
          className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8"
        >
          Join us in the fight against hunger. Your donation can provide a warm meal and hope to those who need it most.
        </motion.p>
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.7 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-purple-700 transition-all duration-300 shadow-lg"
        >
          Donate Now
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;