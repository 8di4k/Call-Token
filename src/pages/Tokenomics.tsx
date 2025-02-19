import React from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Wallet, Lock, Users, ArrowRight, LineChart,
  Rocket, Shield
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Tokenomics() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100/50">
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-800 tracking-tight">
              {t('tokenomics.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              {t('tokenomics.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800 tracking-tight"
            >
              {t('tokenomics.distribution.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TokenomicsCard
                icon={<Users className="w-8 h-8" />}
                title={t('tokenomics.distribution.public.title')}
                description={t('tokenomics.distribution.public.description')}
              />
              <TokenomicsCard
                icon={<Wallet className="w-8 h-8" />}
                title={t('tokenomics.distribution.development.title')}
                description={t('tokenomics.distribution.development.description')}
              />
              <TokenomicsCard
                icon={<Lock className="w-8 h-8" />}
                title={t('tokenomics.distribution.marketing.title')}
                description={t('tokenomics.distribution.marketing.description')}
              />
              <TokenomicsCard
                icon={<PieChart className="w-8 h-8" />}
                title={t('tokenomics.distribution.noTeam.title')}
                description={t('tokenomics.distribution.noTeam.description')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-t from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800 tracking-tight"
            >
              {t('tokenomics.bondingCurve.title')}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <LineChart className="w-6 h-6 text-primary" />
                      {t('tokenomics.bondingCurve.dynamicPricing')}
                    </h3>
                    <ul className="space-y-4 text-gray-700">
                      {t('tokenomics.bondingCurve.features').map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <ArrowRight className="w-5 h-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Rocket className="w-6 h-6 text-primary" />
                      {t('tokenomics.bondingCurve.launch.title')}
                    </h3>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-primary" />
                        <span>{t('tokenomics.bondingCurve.launch.initialPrice')}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-primary" />
                        <span>{t('tokenomics.bondingCurve.launch.noLimit')}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-primary" />
                        <span>{t('tokenomics.bondingCurve.launch.instant')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-pattern-waves">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800 tracking-tight"
            >
              {t('tokenomics.security.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SecurityCard
                icon={<Shield className="w-6 h-6" />}
                title={t('tokenomics.security.antiBot.title')}
                description={t('tokenomics.security.antiBot.description')}
              />
              <SecurityCard
                icon={<Lock className="w-6 h-6" />}
                title={t('tokenomics.security.fairDistribution.title')}
                description={t('tokenomics.security.fairDistribution.description')}
              />
              <SecurityCard
                icon={<LineChart className="w-6 h-6" />}
                title={t('tokenomics.security.priceStability.title')}
                description={t('tokenomics.security.priceStability.description')}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TokenomicsCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 150 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
    >
      <div className="text-primary mb-4 w-14 h-14 flex items-center justify-center bg-orange-50 rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function SecurityCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 150 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow text-center"
    >
      <div className="text-primary mb-4 w-14 h-14 mx-auto flex items-center justify-center bg-orange-50 rounded-xl">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
