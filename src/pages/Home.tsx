import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Coins, Zap, Users, Globe, ArrowRight, Rocket, 
  Shield, Star, Heart, Laugh, LineChart, Clock, Target, 
  TrendingUp, Zap as Lightning, Lock, MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountdown, formatNumber } from '../utils/countdown';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const timeLeft = useCountdown();
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section with Animated Background */}
      <section className="min-h-screen pt-32 pb-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-white/30 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-full shadow-lg"
              >
                <Rocket className="w-16 h-16 text-primary" />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                {t('home.hero.title')}
              </h1>
              <p className="text-3xl font-bold mb-4">
                {t('home.hero.subtitle')}
              </p>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {t('home.hero.description')}
              </p>
            </motion.div>
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <motion.a
                href="https://pump.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full flex items-center gap-2 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('nav.buyNow')} <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://callprikol.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full flex items-center gap-2 hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('nav.website')} <Globe className="w-5 h-5" />
              </motion.a>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                <p className="text-primary font-medium flex items-center gap-2 justify-center mb-4">
                  <Clock className="w-5 h-5" />
                  {t('home.hero.launchCountdown')}
                </p>
                <div className="grid grid-cols-4 gap-4">
                  <CountdownCard unit={t('time.days')} value={formatNumber(timeLeft.days)} />
                  <CountdownCard unit={t('time.hours')} value={formatNumber(timeLeft.hours)} />
                  <CountdownCard unit={t('time.minutes')} value={formatNumber(timeLeft.minutes)} />
                  <CountdownCard unit={t('time.seconds')} value={formatNumber(timeLeft.seconds)} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <MetricCard
                icon={<Coins />}
                value="1B"
                label={t('metrics.totalSupply')}
                sublabel={t('metrics.fixedForever')}
              />
              <MetricCard
                icon={<Users />}
                value="90%"
                label={t('metrics.publicDistribution')}
                sublabel={t('metrics.fairLaunch')}
              />
              <MetricCard
                icon={<LineChart />}
                value="$0.0001"
                label={t('metrics.initialPrice')}
                sublabel={t('metrics.dynamicGrowth')}
              />
              <MetricCard
                icon={<Target />}
                value="March 8"
                label={t('metrics.launchDate')}
                sublabel="15:00 UTC"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-pattern-grid">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-xl text-gray-600">{t('features.subtitle')}</p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<LineChart />}
              title={t('features.bondingCurve.title')}
              description={t('features.bondingCurve.description')}
              benefits={[
                t('features.bondingCurve.benefit1'),
                t('features.bondingCurve.benefit2'),
                t('features.bondingCurve.benefit3')
              ]}
            />
            <FeatureCard
              icon={<Shield />}
              title={t('features.security.title')}
              description={t('features.security.description')}
              benefits={[
                t('features.security.benefit1'),
                t('features.security.benefit2'),
                t('features.security.benefit3')
              ]}
            />
            <FeatureCard
              icon={<Users />}
              title={t('features.community.title')}
              description={t('features.community.description')}
              benefits={[
                t('features.community.benefit1'),
                t('features.community.benefit2'),
                t('features.community.benefit3')
              ]}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('howItWorks.title')}</h2>
              <p className="text-xl text-gray-600">{t('howItWorks.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number="01"
                icon={<Lightning />}
                title={t('howItWorks.step1.title')}
                description={t('howItWorks.step1.description')}
              />
              <StepCard
                number="02"
                icon={<Target />}
                title={t('howItWorks.step2.title')}
                description={t('howItWorks.step2.description')}
              />
              <StepCard
                number="03"
                icon={<TrendingUp />}
                title={t('howItWorks.step3.title')}
                description={t('howItWorks.step3.description')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-pattern-waves">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">{t('community.title')}</h2>
            <p className="text-xl text-gray-600 mb-12">
              {t('community.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <SocialCard
                icon={<MessageCircle />}
                platform="Telegram"
                link="https://t.me/prikoltoken"
                color="bg-blue-500"
              />
              <SocialCard
                icon={<Globe />}
                platform="Website"
                link="https://callprikol.ru"
                color="bg-primary"
              />
              <SocialCard
                icon={<Lock />}
                platform="Pump.fun"
                link="https://pump.fun"
                color="bg-purple-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-100/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/announcement"
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                {t('cta.viewDetails')} <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://pump.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full hover:bg-orange-50 transition-colors text-center flex items-center justify-center gap-2"
              >
                {t('cta.visitPumpFun')} <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon, value, label, sublabel }: { icon: React.ReactNode; value: string; label: string; sublabel: string }) {
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
      <div className="text-3xl font-bold text-primary mb-1">{value}</div>
      <div className="font-medium text-gray-900 mb-1">{label}</div>
      <div className="text-sm text-gray-600">{sublabel}</div>
    </motion.div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description,
  benefits
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  benefits: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-primary mb-6 w-14 h-14 flex items-center justify-center bg-orange-50 rounded-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function StepCard({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-lg relative"
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div className="text-primary mb-6 w-14 h-14 flex items-center justify-center bg-orange-50 rounded-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function SocialCard({ icon, platform, link, color }: { icon: React.ReactNode; platform: string; link: string; color: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow"
    >
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div className="text-left">
        <div className="font-bold text-lg">{platform}</div>
        <div className="text-gray-600 text-sm">Join Now</div>
      </div>
    </motion.a>
  );
}

function CountdownCard({ unit, value }: { unit: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-primary mb-1">{value}</div>
      <div className="text-sm text-gray-600">{unit}</div>
    </div>
  );
}