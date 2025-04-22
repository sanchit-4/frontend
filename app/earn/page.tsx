"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Wallet, Award, History, Globe } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { UserButton } from "@clerk/nextjs";

interface MonitoringTask {
  id: string;
  url: string;
  reward: number;
  status: "available" | "completed";
  timestamp?: string;
}

function App() {
  const [userIP, setUserIP] = useState("Loading...");
  const [walletConnected, setWalletConnected] = useState(false);
  const [tasks] = useState<MonitoringTask[]>([
    { id: "1", url: "https://example.com", reward: 0.5, status: "available" },
    { id: "2", url: "https://test.com", reward: 0.3, status: "available" },
    {
      id: "3",
      url: "https://demo.com",
      reward: 0.4,
      status: "completed",
      timestamp: "2024-01-20 15:30",
    },
  ]);

  // Fetch IP on mount
  React.useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto py-8 px-4 pt-24">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-white">
                Earn by Monitoring
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-gray-400 text-sm">IP: {userIP}</div>
              <button
                onClick={() => setWalletConnected(!walletConnected)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                <Wallet className="w-4 h-4" />
                <span>{walletConnected ? "Connected" : "Connect Wallet"}</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="text-blue-500" />
                <h2 className="text-xl font-semibold text-white">
                  Available Websites
                </h2>
              </div>
              <div className="space-y-4">
                {tasks
                  .filter((t) => t.status === "available")
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-black/20 rounded-lg border border-gray-800/30"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-medium">{task.url}</h3>
                          <p className="text-gray-400 text-sm">
                            Reward: {task.reward} USDT
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600/60 hover:bg-blue-700/60 rounded-lg text-white text-sm">
                          Monitor
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50"
            >
              <div className="flex items-center space-x-2 mb-6">
                <History className="text-blue-500" />
                <h2 className="text-xl font-semibold text-white">
                  Monitoring History
                </h2>
              </div>
              <div className="space-y-4">
                {tasks
                  .filter((t) => t.status === "completed")
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-black/20 rounded-lg border border-gray-800/30"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-medium">{task.url}</h3>
                          <p className="text-gray-400 text-sm">
                            {task.timestamp}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="text-green-500 w-4 h-4" />
                          <span className="text-green-400">
                            {task.reward} USDT
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
