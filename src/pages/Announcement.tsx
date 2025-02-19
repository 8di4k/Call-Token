import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Coins, ArrowRight, Globe, MessageCircle, Twitter, LineChart, Users } from 'lucide-react';
import { useCountdown, formatNumber } from '../utils/countdown';
import { useLanguage } from '../contexts/LanguageContext';

export default function Announcement() {
  const timeLeft = useCountdown();
  const { t } = useLanguage();

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-200 bg-orange-50">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Rocket className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl font-bold">{t('announcement.title')}</h1>
                </div>
                <p className="text-xl text-center text-gray-600">
                  {t('announcement.subtitle')}
                </p>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <CountdownCard unit={t('time.days')} value={formatNumber(timeLeft.days)} />
                  <CountdownCard unit={t('time.hours')} value={formatNumber(timeLeft.hours)} />
                  <CountdownCard unit={t('time.minutes')} value={formatNumber(timeLeft.minutes)} />
                  <CountdownCard unit={t('time.seconds')} value={formatNumber(timeLeft.seconds)} />
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Launch Details */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Coins className="w-6 h-6 text-primary" />
                    {t('announcement.launchDetails.title')}
                  </h2>
                  <ul className="space-y-3">
                    <ListItem>{t('announcement.launchDetails.date')}</ListItem>
                    <ListItem>{t('announcement.launchDetails.price')}</ListItem>
                    <ListItem>{t('announcement.launchDetails.supply')}</ListItem>
                    <ListItem>{t('announcement.launchDetails.curve')}</ListItem>
                    <ListItem>{t('announcement.launchDetails.platform')}</ListItem>
                  </ul>
                </div>

                {/* Fair Distribution */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    {t('announcement.distribution.title')}
                  </h2>
                  <ul className="space-y-3">
                    <ListItem>{t('announcement.distribution.public')}</ListItem>
                    <ListItem>{t('announcement.distribution.development')}</ListItem>
                    <ListItem>{t('announcement.distribution.marketing')}</ListItem>
                    <ListItem>{t('announcement.distribution.noTeam')}</ListItem>
                  </ul>
                </div>

                {/* Bonding Curve */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <LineChart className="w-6 h-6 text-primary" />
                    {t('announcement.bondingCurve.title')}
                  </h2>
                  <ul className="space-y-3">
                    <ListItem>{t('announcement.bondingCurve.dynamic')}</ListItem>
                    <ListItem>{t('announcement.bondingCurve.early')}</ListItem>
                    <ListItem>{t('announcement.bondingCurve.liquidity')}</ListItem>
                    <ListItem>{t('announcement.bondingCurve.noLimit')}</ListItem>
                  </ul>
                </div>

                {/* Security Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    {t('announcement.security.title')}
                  </h2>
                  <ul className="space-y-3">
                    <ListItem>{t('announcement.security.antiBot')}</ListItem>
                    <ListItem>{t('announcement.security.fairLaunch')}</ListItem>
                    <ListItem>{t('announcement.security.platform')}</ListItem>
                  </ul>
                </div>

                {/* How to Participate */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t('announcement.howTo.title')}</h2>
                  <div className="space-y-4">
                    <Step 
                      number={1} 
                      title={t('announcement.howTo.step1.title')}
                      description={t('announcement.howTo.step1.description')}
                    />
                    <Step 
                      number={2} 
                      title={t('announcement.howTo.step2.title')}
                      description={t('announcement.howTo.step2.description')}
                    />
                    <Step 
                      number={3} 
                      title={t('announcement.howTo.step3.title')}
                      description={t('announcement.howTo.step3.description')}
                    />
                  </div>
                </div>

                {/* Official Links */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-6 h-6 text-primary" />
                    Official Links
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SocialLink
                      icon={<Globe className="w-5 h-5" />}
                      title="Website"
                      link="https://callprikol.ru"
                    />
                    <SocialLink
                      icon={<MessageCircle className="w-5 h-5" />}
                      title="Telegram"
                      link="https://t.me/prikoltoken"
                    />
                    <SocialLink
                      icon={<Twitter className="w-5 h-5" />}
                      title="Twitter"
                      link="https://twitter.com/prikoltoken"
                    />
                    <SocialLink
                      icon={<ArrowRight className="w-5 h-5" />}
                      title="Launch Platform"
                      link="https://pump.fun"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-lg"
    >
      <span>{children}</span>
    </motion.li>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

function SocialLink({ icon, title, link }: { icon: React.ReactNode; title: string; link: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
    >
      <div className="text-primary">{icon}</div>
      <span className="font-medium">{title}</span>
    </motion.a>
  );
}

function CountdownCard({ unit, value }: { unit: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      <div className="text-gray-600">{unit}</div>
    </motion.div>
  );
}