"use client";
import { Activity, Bell, Clock, Server, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
};

function App() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-400 to-violet-500 text-transparent bg-clip-text">
                Monitor Your Services with Confidence
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                Get instant alerts when your services go down. Monitor uptime,
                performance, and ensure your business never misses a beat.
              </p>
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center"
                >
                  Start Monitoring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => router.push("/earn")}
                  className="px-6 py-3 border border-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-400 transition text-white flex items-center"
                >
                  Earn
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="Dashboard"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-black/50 backdrop-blur-sm py-20 border-t border-gray-800/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              Everything you need for reliable monitoring
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<Bell className="h-8 w-8 text-indigo-400" />}
                title="Instant Alerts"
                description="Get notified immediately when your services experience downtime through multiple channels."
              />
              <FeatureCard
                icon={<Clock className="h-8 w-8 text-indigo-400" />}
                title="24/7 Monitoring"
                description="Round-the-clock monitoring from multiple locations worldwide."
              />
              <FeatureCard
                icon={<Server className="h-8 w-8 text-indigo-400" />}
                title="Detailed Reports"
                description="Comprehensive reports and analytics to track your service performance."
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              Simple, transparent pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard
                title="Starter"
                price="29"
                features={[
                  "10 monitors",
                  "1-minute checks",
                  "Email notifications",
                  "5 team members",
                  "24h data retention",
                ]}
              />
              <PricingCard
                title="Professional"
                price="79"
                featured={true}
                features={[
                  "50 monitors",
                  "30-second checks",
                  "All notification channels",
                  "Unlimited team members",
                  "30-day data retention",
                  "API access",
                ]}
              />
              <PricingCard
                title="Enterprise"
                price="199"
                features={[
                  "Unlimited monitors",
                  "15-second checks",
                  "Priority support",
                  "Custom solutions",
                  "90-day data retention",
                  "SLA guarantee",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800/50 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-indigo-400" />
                  <span className="text-xl font-bold">StatusChain</span>
                </div>
                <p className="mt-4 text-gray-400">
                  Keeping your services online, always.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      API
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2025 StatusChain. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
//@ts-expect-error hotahai
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
//@ts-expect-error hotahai
function PricingCard({ title, price, features, featured = false }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      className={`p-8 rounded-lg backdrop-blur-sm border border-gray-800/50 ${
        featured
          ? "bg-blue-600/20 text-white ring-2 ring-blue-500/50"
          : "bg-gray-900/50 text-white"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-sm">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-lg transition ${
          featured
            ? "bg-white text-blue-600 hover:bg-gray-100"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
}

export default App;
