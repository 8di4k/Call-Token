import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Flag,
  Target,
  Globe,
  Users,
  Zap,
  Lock,
  Coins,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/* ---------------------------------------------
   ANIMATION VARIANTS
---------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'anticipate',
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

const iconHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.15, rotate: 8 }
};

/* ---------------------------------------------
   CONFIG: which keys to show in Overview
---------------------------------------------- */
const overviewKeys = [
  'whatIsCallPrikol',
  'currentReach',
  'technologySetup',
  // 'adjustments',
  'financial',
  'brandPromotion'
];

const marketKeys = ['india', 'usa', 'kazakhstan'];

export default function Roadmap() {
  const { t } = useLanguage();

  return (
    // Added a subtle radial gradient background
    <div className="pt-32 min-h-screen bg-radial-at-tl from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-5xl font-extrabold mb-6 text-gray-800 leading-tight"
            >
              {/* Example icon in the heading */}
              <MapPin size={32} className="text-primary" />
              {t('roadmap.title')}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 font-light leading-relaxed"
            >
              {t('roadmap.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CALL-PRIKOL OVERVIEW */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Main Overview Title */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-10"
          >
            <motion.h2
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-4xl font-bold text-gray-800 leading-tight"
            >
              <Globe size={28} className="text-primary" />
              {t('roadmap.overview.title')}
            </motion.h2>
          </motion.div>

          {/* 1) Overview Blocks (e.g. whatIsCallPrikol, currentReach) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 mb-16"
          >
            {overviewKeys.map((key) => (
              <OverviewBlock
                key={key}
                title={t(`roadmap.overview.${key}.title`)}
                bullets={t(`roadmap.overview.${key}.bullets`)}
              />
            ))}
          </motion.div>

          {/* 2) Markets Section (India, USA, Kazakhstan) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-10"
            >
              <h3 className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 leading-tight">
                <Flag size={24} className="text-primary" />
                {t('roadmap.overview.markets.title')}
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {marketKeys.map((market) => (
                <OverviewBlock
                  key={market}
                  title={t(`roadmap.overview.markets.${market}.title`)}
                  bullets={t(`roadmap.overview.markets.${market}.bullets`)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM HISTORY */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-4xl font-bold mb-12 text-center text-gray-800 leading-tight"
            >
              <Rocket size={28} className="text-primary" />
              {t('roadmap.developmentRoadmap.platformHistory.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <HistoryCard
                year={t('roadmap.developmentRoadmap.platformHistory.launch.year')}
                title={t('roadmap.developmentRoadmap.platformHistory.launch.title')}
                description={t(
                  'roadmap.developmentRoadmap.platformHistory.launch.description'
                )}
                icon={<Rocket size={24} aria-hidden="true" />}
                achievements={t(
                  'roadmap.developmentRoadmap.platformHistory.launch.achievements'
                )}
              />
              <HistoryCard
                year={t('roadmap.developmentRoadmap.platformHistory.growth.year')}
                title={t('roadmap.developmentRoadmap.platformHistory.growth.title')}
                description={t(
                  'roadmap.developmentRoadmap.platformHistory.growth.description'
                )}
                icon={<Users size={24} aria-hidden="true" />}
                achievements={t(
                  'roadmap.developmentRoadmap.platformHistory.growth.achievements'
                )}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CURRENT DEVELOPMENT */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-4xl font-bold mb-12 text-center text-gray-800 leading-tight"
            >
              <Zap size={28} className="text-primary" />
              {t('roadmap.developmentRoadmap.currentDevelopment.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DevelopmentCard
                icon={<Coins size={24} aria-hidden="true" />}
                title={t(
                  'roadmap.developmentRoadmap.currentDevelopment.token.title'
                )}
                items={t(
                  'roadmap.developmentRoadmap.currentDevelopment.token.items'
                )}
              />
              <DevelopmentCard
                icon={<Lock size={24} aria-hidden="true" />}
                title={t(
                  'roadmap.developmentRoadmap.currentDevelopment.security.title'
                )}
                items={t(
                  'roadmap.developmentRoadmap.currentDevelopment.security.items'
                )}
              />
              <DevelopmentCard
                icon={<Zap size={24} aria-hidden="true" />}
                title={t(
                  'roadmap.developmentRoadmap.currentDevelopment.blockchain.title'
                )}
                items={t(
                  'roadmap.developmentRoadmap.currentDevelopment.blockchain.items'
                )}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FUTURE VISION */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-4xl font-bold mb-12 text-center text-gray-800 leading-tight"
            >
              <Target size={28} className="text-primary" />
              {t('roadmap.developmentRoadmap.futureVision.title')}
            </motion.h2>
            <div className="space-y-12">
              <RoadmapPhase
                icon={<Globe size={24} aria-hidden="true" />}
                phase={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q3.phase'
                )}
                title={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q3.title'
                )}
                items={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q3.items'
                )}
                status="upcoming"
              />
              <RoadmapPhase
                icon={<Target size={24} aria-hidden="true" />}
                phase={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q4.phase'
                )}
                title={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q4.title'
                )}
                items={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q4.items'
                )}
                status="upcoming"
              />
              <RoadmapPhase
                icon={<Flag size={24} aria-hidden="true" />}
                phase={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q1.phase'
                )}
                title={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q1.title'
                )}
                items={t(
                  'roadmap.developmentRoadmap.futureVision.phases.q1.items'
                )}
                status="upcoming"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------------
   OVERVIEW BLOCK
-------------------------------------- */
function OverviewBlock({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      className="bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <motion.h3
        variants={itemVariants}
        className="text-2xl font-bold mb-4 text-gray-800 leading-tight flex items-center gap-2"
      >
        {/* Icon next to smaller headings (optional) */}
        <Flag size={20} className="text-primary" />
        {title}
      </motion.h3>
      <ul className="space-y-3 text-gray-700 leading-relaxed">
        {bullets.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* --------------------------------------
   HISTORY CARD
-------------------------------------- */
function HistoryCard({
  year,
  title,
  description,
  icon,
  achievements = []
}: {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  achievements: string[];
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      className="bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <motion.div
        variants={iconHover}
        initial="rest"
        whileHover="hover"
        className="text-primary mb-4 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg"
      >
        {icon}
      </motion.div>
      <div className="mb-4">
        <span className="text-sm font-medium text-primary">{year}</span>
        <h3 className="text-xl font-bold mt-1 text-gray-800 leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      {achievements.length > 0 && (
        <ul className="space-y-2">
          {achievements.map((achievement, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-center gap-2 text-gray-700"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{achievement}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* --------------------------------------
   DEVELOPMENT CARD
-------------------------------------- */
function DevelopmentCard({
  icon,
  title,
  items = []
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      className="bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <motion.div
        variants={iconHover}
        initial="rest"
        whileHover="hover"
        className="text-primary mb-4 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 leading-tight">
        {title}
      </h3>
      {items.length > 0 && (
        <ul className="space-y-3 text-gray-700 leading-relaxed">
          {items.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* --------------------------------------
   ROADMAP PHASE
-------------------------------------- */
function RoadmapPhase({
  icon,
  phase,
  title,
  items = [],
  status
}: {
  icon: React.ReactNode;
  phase: string;
  title: string;
  items: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}) {
  // Keep consistent status colors (can adapt to brand style)
  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-primary',
    upcoming: 'bg-gray-300'
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      className="relative bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
            <span className="text-sm font-medium text-gray-500">{phase}</span>
          </div>
          <h3 className="text-2xl font-bold mt-2 text-gray-800 leading-tight">
            {title}
          </h3>
          <motion.div
            variants={iconHover}
            initial="rest"
            whileHover="hover"
            aria-hidden="true"
            className="text-primary mt-4 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg"
          >
            {icon}
          </motion.div>
        </div>
        <div className="md:w-2/3">
          {items.length > 0 && (
            <ul className="space-y-3 mt-4 text-gray-700 leading-relaxed">
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${statusColors[status]}`}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
