import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const Companies = () => {
  return (
    <div className="pt-24 pb-12 w-full max-w-6xl mx-auto px-4">
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm font-semibold tracking-wider text-gray-400 uppercase text-center mb-10"
      >
        Trusted by learners from world-class companies
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-500">
        {[
          { src: assets.microsoft_logo, alt: "Microsoft", width: "md:w-32 w-24" },
          { src: assets.walmart_logo, alt: "Walmart", width: "md:w-32 w-24" },
          { src: assets.google_logo, alt: "Google", width: "md:w-28 w-22" },
          { src: assets.adobe_logo, alt: "Adobe", width: "md:w-28 w-22" },
          { src: assets.paypal_logo, alt: "Paypal", width: "md:w-28 w-22" },
        ].map((company, index) => (
          <motion.img 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`${company.width} grayscale hover:grayscale-0 transition-all duration-300 filter brightness-200 hover:brightness-100`} 
            src={company.src} 
            alt={company.alt} 
          />
        ))}
      </div>
    </div>
  );
};

export default Companies;
