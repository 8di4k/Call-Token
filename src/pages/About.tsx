import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Rocket, Globe, ArrowRight, Twitter, Instagram as Telegram } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="pb-20 hero-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About $PRIKOL</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the story behind the most innovative meme token in the crypto space
            </p>
            <div className="flex gap-4 justify-center">
              <motion.a
                href="https://pump.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch on Pump.fun <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://callprikol.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary text-primary px-8 py-3 rounded-full flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Website <Globe className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-pattern-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                $PRIKOL aims to revolutionize the meme token space by combining humor with real utility. We believe that
                cryptocurrency should be fun, accessible, and valuable for everyone.
              </p>
              <p className="text-lg text-gray-600">
                Our community-driven approach ensures that every holder has a voice in the project's direction, making
                $PRIKOL truly decentralized and democratic.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <ValueCard
                icon={<Shield className="w-8 h-8" />}
                title="Security"
                description="Fully audited and secure smart contract"
              />
              <ValueCard
                icon={<Target className="w-8 h-8" />}
                title="Transparency"
                description="Open and honest communication"
              />
              <ValueCard
                icon={<Users className="w-8 h-8" />}
                title="Community"
                description="Strong and engaged community"
              />
              <ValueCard
                icon={<Rocket className="w-8 h-8" />}
                title="Innovation"
                description="Continuous development and improvement"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-pattern-waves">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Join Our Community</h2>
            <p className="text-xl text-gray-600 mb-12">
              Be part of the $PRIKOL revolution and help shape the future of meme tokens
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href="https://t.me/prikoltoken"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <Telegram className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Telegram Community</h3>
                  <p className="text-gray-600">Join our active Telegram group</p>
                </div>
              </motion.a>
              <motion.a
                href="https://twitter.com/prikoltoken"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-400">
                  <Twitter className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Twitter</h3>
                  <p className="text-gray-600">Follow us for latest updates</p>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}