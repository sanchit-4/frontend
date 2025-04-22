"use client";
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Plus, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useWebsites } from "@/hooks/useWebsites";
import axios from "axios";
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import { AnimatedBackground } from "@/components/AnimatedBackground";

type UptimeStatus = "good" | "bad" | "unknown";

// Add these animation variants at the top
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

function StatusCircle({ status }: { status: UptimeStatus }) {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={`w-3 h-3 rounded-full ${
        status === "good"
          ? "bg-blue-500 shadow-lg shadow-blue-500/50"
          : status === "bad"
            ? "bg-red-500 shadow-lg shadow-red-500/50"
            : "bg-gray-500"
      }`}
    />
  );
}

function UptimeTicks({ ticks }: { ticks: UptimeStatus[] }) {
  return (
    <div className="flex gap-1 mt-2">
      {ticks.map((tick, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className={`w-8 h-2 rounded ${
            tick === "good"
              ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
              : tick === "bad"
                ? "bg-red-500 shadow-lg shadow-red-500/30"
                : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

function CreateWebsiteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (url: string | null) => void;
}) {
  const [url, setUrl] = useState("");
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-black/80 backdrop-blur-xl rounded-lg p-6 w-full max-w-md border border-gray-800/50 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Add New Website
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => onClose(null)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => onClose(url)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Website
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProcessedWebsite {
  id: string;
  url: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
}

function WebsiteCard({ website }: { website: ProcessedWebsite }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-md border border-gray-800/50 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <StatusCircle status={website.status} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {website.url}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {website.uptimePercentage.toFixed(1)}% uptime
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
          <div className="mt-3">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Last 30 minutes status:
            </p>
            <UptimeTicks ticks={website.uptimeTicks} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Last checked: {website.lastChecked}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { websites, refreshWebsites } = useWebsites();
  const { getToken } = useAuth();

  const processedWebsites = useMemo(() => {
    return websites.map((website) => {
      // Sort ticks by creation time
      const sortedTicks = [...website.ticks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Get the most recent 30 minutes of ticks
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(
        (tick) => new Date(tick.createdAt) > thirtyMinutesAgo
      );

      // Aggregate ticks into 3-minute windows (10 windows total)
      const windows: UptimeStatus[] = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

        const windowTicks = recentTicks.filter((tick) => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

        // Window is considered up if majority of ticks are up
        const upTicks = windowTicks.filter(
          (tick) => tick.status === "Good"
        ).length;
        windows[9 - i] =
          windowTicks.length === 0
            ? "unknown"
            : upTicks / windowTicks.length >= 0.5
              ? "good"
              : "bad";
      }

      // Calculate overall status and uptime percentage
      const totalTicks = sortedTicks.length;
      const upTicks = sortedTicks.filter(
        (tick) => tick.status === "Good"
      ).length;
      const uptimePercentage =
        totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

      // Get the most recent status
      const currentStatus = windows[windows.length - 1];

      // Format the last checked time
      const lastChecked = sortedTicks[0]
        ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
        : "Never";

      return {
        id: website.id,
        url: website.url,
        status: currentStatus,
        uptimePercentage,
        lastChecked,
        uptimeTicks: windows,
      };
    });
  }, [websites]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto py-8 px-4 pt-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-white">
                StatusChain Monitor
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Website</span>
            </button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {processedWebsites.map((website) => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </motion.div>
        </div>

        <CreateWebsiteModal
          isOpen={isModalOpen}
          onClose={async (url) => {
            if (url === null) {
              setIsModalOpen(false);
              return;
            }

            const token = await getToken();
            setIsModalOpen(false);
            axios
              .post(
                `${API_BACKEND_URL}/api/v1/website`,
                {
                  url,
                },
                {
                  headers: {
                    Authorization: token,
                  },
                }
              )
              .then(() => {
                refreshWebsites();
              });
          }}
        />
      </div>
    </div>
  );
}

export default App;
