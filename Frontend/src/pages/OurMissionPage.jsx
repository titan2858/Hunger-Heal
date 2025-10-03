import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Recycle, Users } from 'lucide-react';
import missionBanner from '../assets/Images/mission-banner.jpg'; // Make sure this path is correct
import { Card, CardContent } from '@/components/ui/card'; // Import Shadcn Card

const OurMissionPage = () => {
  const coreValues = [
    { icon: Zap, title: "Efficiency", description: "Using technology to ensure fast and reliable food collection and distribution." },
    { icon: Recycle, title: "Reduce Waste", description: "Fighting hunger by redirecting surplus food from landfills to hungry mouths." },
    { icon: Users, title: "Community", description: "Building a strong network of donors, volunteers, and recipients to foster local support." },
    { icon: Shield, title: "Dignity", description: "Providing food support with the utmost respect and dignity for all individuals." },
  ];

  return (
    // Main container for the full-page background
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed py-24 px-4"
      style={{backgroundImage: `url(${missionBanner})`}}
    >
      {/* Dark overlay for the entire page */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* All content is now relative to the main container */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-24">
        
        {/* Mission Text Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold">Our Mission</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            To create a hunger-free community by building an efficient and compassionate bridge between food surplus and those in need.
          </p>
        </motion.div>

        {/* Core Values Section in a Card */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                <CardContent className="pt-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((value, index) => (
                        <div key={index} className="p-6 text-center">
                            <div className="bg-green-100 text-green-600 rounded-full h-20 w-20 inline-flex items-center justify-center mb-5">
                            <value.icon className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default OurMissionPage;