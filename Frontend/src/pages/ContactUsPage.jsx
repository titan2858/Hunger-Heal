import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// 1. Import your new banner image
import contactBanner from '../assets/Images/contact-banner.jpg';

const ContactUsPage = () => {
  return (
    <div className="bg-gray-50">
      {/* ## NEW HERO BANNER SECTION ## */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${contactBanner})` }}
      >
       
      </div>

      {/* Existing Contact Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} 
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Get In Touch</h2>
            <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Whether you have a question or a partnership proposal, our team is ready to answer all your questions.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full"><MapPin /></div>
                <div>
                  <h3 className="text-xl font-semibold">Our Office</h3>
                  <p className="text-gray-500">123 HungerHeal St, Food City, 416005</p>
                </div>
              </div>
               <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full"><Mail /></div>
                <div>
                  <h3 className="text-xl font-semibold">Email Us</h3>
                  <p className="text-gray-500">contact@hungerheal.org</p>
                </div>
              </div>
               <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-full"><Phone /></div>
                <div>
                  <h3 className="text-xl font-semibold">Call Us</h3>
                  <p className="text-gray-500">+91 987 654 3210</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <Input type="text" placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="Your Message" rows={5}/>
                <Button className="w-full">Send Message</Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;