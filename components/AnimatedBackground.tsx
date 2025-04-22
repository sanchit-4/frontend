"use client";
import { motion } from "framer-motion";
import React from "react";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px]" />
      </motion.div>

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="url(#gradient-1)"
          strokeWidth="2"
          strokeDasharray="10,10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke="url(#gradient-2)"
          strokeWidth="2"
          strokeDasharray="10,10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 2.5,
          }}
        />
        <defs>
          <linearGradient id="gradient-1" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient-2" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: -20,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: "120vh",
              x: `${Math.random() * 20 - 10 + parseInt(i.toString()) * 3}vw`,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Radial overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
  );
};
