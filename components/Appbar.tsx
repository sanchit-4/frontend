"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Appbar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center p-6 bg-black/40 backdrop-blur-xl fixed w-full z-50 border-b border-gray-800/30"
    >
      <motion.div
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Activity className="h-8 w-8 text-blue-500" />
        <Link href="/">
          <span className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-violet-500 text-transparent bg-clip-text">
            StatusChain
          </span>
        </Link>
      </motion.div>

      <div className="flex gap-4">
        <SignedOut>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-gray-900/80 text-white hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/30">
                Sign In
              </button>
            </SignInButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-blue-600/80 text-white hover:bg-blue-700/80 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                Sign Up
              </button>
            </SignUpButton>
          </motion.div>
        </SignedOut>
        <SignedIn>
          <motion.div whileHover={{ scale: 1.05 }}>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </motion.div>
        </SignedIn>
      </div>
    </motion.div>
  );
}
