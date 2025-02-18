import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function LoadingLogo() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 1],
          opacity: [0, 1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl animate-pulse" />
        <div className="relative bg-gradient-to-br from-primary to-primary-dark p-6 rounded-full text-white">
          <Rocket className="w-12 h-12" />
        </div>
      </motion.div>
    </div>
  );
}