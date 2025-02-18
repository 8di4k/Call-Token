import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Wallet, Lock, Users, ArrowRight, LineChart, Rocket, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Tokenomics() {
  const { t } = useLanguage();

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">{t('tokenomics.title')}</h1>
            <p className="text-xl text-gray-600">
              {t('tokenomics.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Token Distribution */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{t('tokenomics.distribution.title')}</h2>
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

      {/* Bonding Curve */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{t('tokenomics.bondingCurve.title')}</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <LineChart className="w-6 h-6 text-primary" />
                      {t('tokenomics.bondingCurve.dynamicPricing')}
                    </h3>
                    <ul className="space-y-4">
                      {t('tokenomics.bondingCurve.features').map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
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
                    <ul className="space-y-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-pattern-waves">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{t('tokenomics.security.title')}</h2>
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

function TokenomicsCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="text-primary mb-4 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function SecurityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg text-center"
    >
      <div className="text-primary mb-4 w-12 h-12 mx-auto flex items-center justify-center bg-orange-50 rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}