import React from 'react';
import { motion } from 'framer-motion';
import { HandHeart, Truck, UserCheck } from 'lucide-react';

// 1. Import the gallery images
import p1 from '../assets/Images/p1.jpeg';
import p4 from '../assets/Images/p4.jpeg';
import p3 from '../assets/Images/p3.jpeg';

const galleryImages = [p1, p4, p3];

const AboutUsPage = () => {
  const simulationSteps = [
    {
      icon: HandHeart,
      title: 'Donor Makes a Donation',
      description: 'A kind-hearted donor uses our simple form to list surplus food they wish to donate.'
    },
    {
      icon: UserCheck,
      title: 'Admin Accepts & Assigns',
      description: 'Our admin team reviews the donation request, accepts it, and assigns a nearby agent for pickup.'
    },
    {
      icon: Truck,
      title: 'Agent Collects the Food',
      description: 'The assigned agent receives the details, collects the food from the donor, and delivers it to those in need.'
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-purple-50 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-800">Connecting Hearts, Filling Plates</h1>
          <p className="mt-4 text-lg text-gray-600">
            HungerHeal was born from a simple idea: to bridge the gap between food surplus and food scarcity using technology.
          </p>
        </motion.div>
      </div>

      {/* How It Works (Simulation) Section */}
      <div className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Our Platform Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {simulationSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-8 border border-gray-200 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-purple-100 text-purple-600 rounded-full h-16 w-16 inline-flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ## NEW "OUR WORKS" SECTION ## */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              "Look what we can do together."
            </p>
          </motion.div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-64 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUsPage;