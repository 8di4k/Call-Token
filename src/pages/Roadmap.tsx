import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Flag, Target, Globe, Users, Zap, Lock, Coins } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Roadmap() {
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
            <h1 className="text-5xl font-bold mb-6">{t('roadmap.title')}</h1>
            <p className="text-xl text-gray-600">
              {t('roadmap.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform History */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{t('roadmap.platformHistory.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <HistoryCard
                year={t('roadmap.platformHistory.launch.year')}
                title={t('roadmap.platformHistory.launch.title')}
                description={t('roadmap.platformHistory.launch.description')}
                icon={<Rocket />}
                achievements={t('roadmap.platformHistory.launch.achievements')}
              />
              <HistoryCard
                year={t('roadmap.platformHistory.growth.year')}
                title={t('roadmap.platformHistory.growth.title')}
                description={t('roadmap.platformHistory.growth.description')}
                icon={<Users />}
                achievements={t('roadmap.platformHistory.growth.achievements')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Current Development */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{t('roadmap.currentDevelopment.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DevelopmentCard
                icon={<Coins />}
                title={t('roadmap.currentDevelopment.token.title')}
                 items={t('roadmap.currentDevelopment.token.items')}
              />
              <DevelopmentCard
                icon={<Lock />}
                title={t('roadmap.currentDevelopment.security.title')}
                items={t('roadmap.currentDevelopment.security.items')}
              />
              <DevelopmentCard
                icon={<Zap />}
                title={t('roadmap.currentDevelopment.blockchain.title')}
                items={t('roadmap.currentDevelopment.blockchain.items')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{t('roadmap.futureVision.title')}</h2>
            <div className="space-y-12">
              <RoadmapPhase
                icon={<Globe />}
                phase={t('roadmap.futureVision.phases.q3.phase')}
                title={t('roadmap.futureVision.phases.q3.title')}
                items={t('roadmap.futureVision.phases.q3.items')}
                status="upcoming"
              />
              <RoadmapPhase
                icon={<Target />}
                phase={t('roadmap.futureVision.phases.q4.phase')}
                title={t('roadmap.futureVision.phases.q4.title')}
                items={t('roadmap.futureVision.phases.q4.items')}
                status="upcoming"
              />
              <RoadmapPhase
                icon={<Flag />}
                phase={t('roadmap.futureVision.phases.q1.phase')}
                title={t('roadmap.futureVision.phases.q1.title')}
                items={t('roadmap.futureVision.phases.q1.items')}
                status="upcoming"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HistoryCard({
  year,
  title,
  description,
  icon,
  achievements
}: {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  achievements: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="text-primary mb-4 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg">
        {icon}
      </div>
      <div className="mb-4">
        <span className="text-sm font-medium text-primary">{year}</span>
        <h3 className="text-xl font-bold mt-1">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {achievements.map((achievement, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-gray-700"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{achievement}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function DevelopmentCard({
  icon,
  title,
  items
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="text-primary mb-4 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-gray-700"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function RoadmapPhase({
  icon,
  phase,
  title,
  items,
  status
}: {
  icon: React.ReactNode;
  phase: string;
  title: string;
  items: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}) {
  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-primary',
    upcoming: 'bg-gray-300'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 md:pl-0"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
            <span className="text-sm font-medium text-gray-500">{phase}</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{title}</h3>
          <div className="text-primary mt-4 w-12 h-12 flex items-center justify-center bg-orange-50 rounded-lg">
            {icon}
          </div>
        </div>
        <div className="md:w-2/3">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}