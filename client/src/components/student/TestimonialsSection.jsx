import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {

  return (
    <div className="py-24 px-8 md:px-20 lg:px-40 w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Success Stories from <span className="text-gradient">Our Community</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400"
        >
          Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col card-dark p-8 rounded-3xl relative"
          >
            <Quote className="absolute top-6 right-8 text-brand-purple-400/20" size={40} />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img className="h-14 w-14 rounded-full border-2 border-brand-purple-400/30 object-cover" src={testimonial.image} alt={testimonial.name} />
                <div className="absolute -bottom-1 -right-1 bg-brand-pink-500 rounded-full p-1 border-2 border-[#0b0b0f]">
                   <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{testimonial.name}</h3>
                <p className="text-brand-pink-400 text-sm font-medium">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <img
                  className="h-4 w-4"
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt="star"
                />
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed italic">"{testimonial.feedback}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
