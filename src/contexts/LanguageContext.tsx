import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    nav: {
      about: 'About',
      tokenomics: 'Tokenomics',
      roadmap: 'Roadmap',
      launch: 'Launch 🚀',
      contact: 'Contact',
      website: 'Website',
      buyNow: 'Buy on Pump.fun'
    },
    home: {
      hero: {
        title: 'Welcome to the $PRIKOL Revolution',
        subtitle: 'The Most Memeable Token on Solana',
        description: 'Bringing the spirit of CallPrikol.ru to the blockchain',
        launchCountdown: 'Launching March 8, 2025 at 15:00 UTC on Pump.fun'
      }
    },
    metrics: {
      totalSupply: 'Total Supply',
      fixedForever: 'Fixed Forever',
      publicDistribution: 'Public Distribution',
      fairLaunch: 'Fair Launch',
      initialPrice: 'Initial Price',
      dynamicGrowth: 'Dynamic Growth',
      launchDate: 'Launch Date'
    },
    features: {
      title: 'Why Choose $PRIKOL?',
      subtitle: 'Built for the community, backed by innovation',
      bondingCurve: {
        title: 'Dynamic Pricing',
        description: 'Automatic price discovery through bonding curve',
        benefit1: 'Early supporters get better prices',
        benefit2: 'Sustainable price growth',
        benefit3: 'No price manipulation'
      },
      security: {
        title: 'Maximum Security',
        description: 'Advanced protection mechanisms',
        benefit1: 'Anti-bot measures',
        benefit2: 'Fair launch mechanism',
        benefit3: 'Platform security'
      },
      community: {
        title: 'Community First',
        description: 'Built for and by the community',
        benefit1: 'No team allocation',
        benefit2: '90% public distribution',
        benefit3: 'Transparent development'
      }
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Simple steps to join the revolution',
      step1: {
        title: 'Get Ready',
        description: 'Install Phantom wallet and add SOL'
      },
      step2: {
        title: 'Visit Pump.fun',
        description: 'Connect your wallet to the platform'
      },
      step3: {
        title: 'Buy $PRIKOL',
        description: 'Purchase tokens at the best price'
      }
    },
    community: {
      title: 'Join Our Community',
      description: 'Be part of the $PRIKOL revolution'
    },
    cta: {
      title: 'Ready to Join the Revolution?',
      description: 'Don\'t miss the exclusive launch on Pump.fun',
      viewDetails: 'View Launch Details',
      visitPumpFun: 'Visit Pump.fun'
    },
    time: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    footer: {
      description: 'The most memeable token on Solana, launching exclusively on Pump.fun',
      quickLinks: 'Quick Links',
      resources: 'Resources',
      whitepaper: 'Whitepaper',
      platform: 'Pump.fun Platform',
      faqs: 'FAQs',
      updates: 'Launch Updates',
      stayUpdated: 'Stay updated with our launch on Pump.fun',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      copyright: '© 2025 $PRIKOL Token. All rights reserved.'
    },
    tokenomics: {
      title: 'Tokenomics',
      subtitle: 'A fair and sustainable economic model powered by Pump.fun',
      distribution: {
        title: 'Fair Launch Distribution',
        public: {
          title: 'Public Distribution (90%)',
          description: 'Available through Pump.fun\'s fair launch mechanism'
        },
        development: {
          title: 'Development (5%)',
          description: 'Reserved for future development and platform integration'
        },
        marketing: {
          title: 'Marketing (5%)',
          description: 'Allocated for marketing and community growth'
        },
        noTeam: {
          title: 'No Team Allocation',
          description: '100% fair distribution with no team tokens'
        }
      },
      bondingCurve: {
        title: 'Bonding Curve Model',
        dynamicPricing: 'Dynamic Pricing',
        features: [
          'Price increases with each purchase',
          'Early supporters get better prices',
          'Automatic liquidity generation'
        ],
        launch: {
          title: 'Launch Parameters',
          initialPrice: 'Initial Price: $0.0001',
          noLimit: 'No Maximum Buy Limit',
          instant: 'Instant Trading on Pump.fun'
        }
      },
      security: {
        title: 'Security & Protection',
        antiBot: {
          title: 'Anti-Bot Protection',
          description: 'Advanced measures to prevent manipulation at launch'
        },
        fairDistribution: {
          title: 'Fair Distribution',
          description: 'No presale, no team tokens, 100% fair launch'
        },
        priceStability: {
          title: 'Price Stability',
          description: 'Bonding curve ensures sustainable price growth'
        }
      }
    },
    roadmap: {
      title: 'Our Journey',
      subtitle: 'From platform launch to blockchain integration - the evolution of CallPrikol.ru',
      platformHistory: {
        title: 'Platform History',
        launch: {
          year: '2017',
          title: 'Platform Launch',
          description: 'Successfully launched CallPrikol.ru, establishing the foundation for our digital entertainment platform',
          achievements: [
            'Platform infrastructure development',
            'Core features implementation',
            'Initial user base acquisition',
            'Community guidelines establishment'
          ]
        },
        growth: {
          year: '2017-2025',
          title: 'Market Growth',
          description: 'Achieved significant market expansion and user base growth',
          achievements: [
            'Surpassed 5 million active users',
            'Enhanced platform features',
            'Built strong community presence',
            'Expanded content categories'
          ]
        }
      },
      currentDevelopment: {
        title: 'Current Development (2025)',
        token: {
          title: '$PRIKOL Token',
          items: [
            'Native Solana token launch',
            'Fair distribution model',
            'Community governance',
            'Reward mechanisms'
          ]
        },
        security: {
          title: 'Security & Infrastructure',
          items: [
            'Enhanced platform security',
            'Scalability improvements',
            'Performance optimization',
            'DDoS protection'
          ]
        },
        blockchain: {
          title: 'Blockchain Integration',
          items: [
            'Smart contract development',
            'Web3 wallet integration',
            'Token utility features',
            'Cross-chain compatibility'
          ]
        }
      },
      futureVision: {
        title: 'Future Vision (2025+)',
        phases: {
          q3: {
            phase: 'Q3 2025',
            title: 'Global Expansion',
            items: [
              'Multi-language support rollout',
              'Regional content partnerships',
              'Local community building',
              'Cultural adaptation features'
            ]
          },
          q4: {
            phase: 'Q4 2025',
            title: 'Platform Enhancement',
            items: [
              'Advanced content recommendation system',
              'AI-powered moderation tools',
              'Interactive content creation tools',
              'Enhanced user engagement features'
            ]
          },
          q1: {
            phase: 'Q1 2026',
            title: 'Ecosystem Development',
            items: [
              'Creator marketplace launch',
              'NFT integration',
              'Decentralized content storage',
              'Advanced tokenomics features'
            ]
          }
        }
      }
    },
    announcement: {
      title: '$PRIKOL Token Launch',
      subtitle: 'Fair Launch on Pump.fun - No Presale, No Team Tokens',
      launchDetails: {
        title: 'Launch Details',
        date: 'Launch Date: March 8, 2025 at 15:00 UTC',
        price: 'Initial Price: $0.0001',
        supply: 'Total Supply: 1,000,000,000 PRIKOL',
        curve: 'Bonding Curve: Dynamic pricing based on demand',
        platform: 'Platform: Exclusive launch on Pump.fun'
      },
      distribution: {
        title: 'Fair Distribution',
        public: 'Public Distribution: 90%',
        development: 'Development: 5%',
        marketing: 'Marketing: 5%',
        noTeam: 'No Team Allocation'
      },
      bondingCurve: {
        title: 'Bonding Curve Model',
        dynamic: 'Dynamic pricing increases with each purchase',
        early: 'Early supporters get better prices',
        liquidity: 'Automatic liquidity generation',
        noLimit: 'No maximum buy limit'
      },
      security: {
        title: 'Security Features',
        antiBot: 'Advanced anti-bot protection',
        fairLaunch: 'Fair launch mechanism',
        platform: 'Pump.fun platform security'
      },
      howTo: {
        title: 'How to Participate',
        step1: {
          title: 'Install Wallet',
          description: 'Install Phantom wallet and add SOL to your wallet'
        },
        step2: {
          title: 'Visit Pump.fun',
          description: 'Head to Pump.fun at launch time (March 8, 2025 15:00 UTC)'
        },
        step3: {
          title: 'Purchase Tokens',
          description: 'Buy $PRIKOL tokens with SOL or USDC - earlier buys get better prices!'
        }
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      form: {
        name: {
          label: 'Name',
          placeholder: 'Enter your name',
          required: 'Name is required'
        },
        email: {
          label: 'Email',
          placeholder: 'Enter your email',
          required: 'Email is required',
          invalid: 'Invalid email address'
        },
        subject: {
          label: 'Subject',
          placeholder: 'Enter subject',
          required: 'Subject is required'
        },
        message: {
          label: 'Message',
          placeholder: 'Enter your message',
          required: 'Message is required'
        },
        submit: 'Send Message'
      },
      info: {
        email: {
          title: 'Email',
          content: 'support@prikol.com'
        },
        telegram: {
          title: 'Telegram',
          content: '@prikoltoken'
        },
        location: {
          title: 'Location',
          content: 'Worldwide'
        }
      }
    }
  },
  ru: {
    nav: {
      about: 'О нас',
      tokenomics: 'Токеномика',
      roadmap: 'Дорожная карта',
      launch: 'Запуск 🚀',
      contact: 'Контакты',
      website: 'Веб-сайт',
      buyNow: 'Купить на Pump.fun'
    },
    home: {
      hero: {
        title: 'Добро пожаловать в $PRIKOL',
        subtitle: 'Самый мемный токен на Solana',
        description: 'Приносим дух CallPrikol.ru в блокчейн',
        launchCountdown: 'Запуск 8 марта 2025 в 15:00 UTC на Pump.fun'
      }
    },
    metrics: {
      totalSupply: 'Общее предложение',
      fixedForever: 'Фиксированное навсегда',
      publicDistribution: 'Публичное распределение',
      fairLaunch: 'Честный запуск',
      initialPrice: 'Начальная цена',
      dynamicGrowth: 'Динамический рост',
      launchDate: 'Дата запуска'
    },
    features: {
      title: 'Почему $PRIKOL?',
      subtitle: 'Создан для сообщества, поддержан инновациями',
      bondingCurve: {
        title: 'Динамическое ценообразование',
        description: 'Автоматическое определение цены через кривую связывания',
        benefit1: 'Ранние участники получают лучшие цены',
        benefit2: 'Устойчивый рост цены',
        benefit3: 'Без манипуляций ценой'
      },
      security: {
        title: 'Максимальная безопасность',
        description: 'Продвинутые механизмы защиты',
        benefit1: 'Анти-бот меры',
        benefit2: 'Механизм честного запуска',
        benefit3: 'Безопасность платформы'
      },
      community: {
        title: 'Сообщество превыше всего',
        description: 'Создан для сообщества и самим сообществом',
        benefit1: 'Нет распределения команде',
        benefit2: '90% публичное распределение',
        benefit3: 'Прозрачная разработка'
      }
    },
    howItWorks: {
      title: 'Как это работает',
      subtitle: 'Простые шаги для участия в революции',
      step1: {
        title: 'Подготовка',
        description: 'Установите кошелек Phantom и добавьте SOL'
      },
      step2: {
        title: 'Посетите Pump.fun',
        description: 'Подключите свой кошелек к платформе'
      },
      step3: {
        title: 'Купите $PRIKOL',
        description: 'Приобретите токены по лучшей цене'
      }
    },
    community: {
      title: 'Присоединяйтесь к сообществу',
      description: 'Станьте частью революции $PRIKOL'
    },
    cta: {
      title: 'Готовы присоединиться к революции?',
      description: 'Не пропустите эксклюзивный запуск на Pump.fun',
      viewDetails: 'Подробности запуска',
      visitPumpFun: 'Посетить Pump.fun'
    },
    time: {
      days: 'Дней',
      hours: 'Часов',
      minutes: 'Минут',
      seconds: 'Секунд'
    },
    footer: {
      description: 'Самый мемный токен на Solana, запускается эксклюзивно на Pump.fun',
      quickLinks: 'Быстрые ссылки',
      resources: 'Ресурсы',
      whitepaper: 'Whitepaper',
      platform: 'Платформа Pump.fun',
      faqs: 'Частые вопросы',
      updates: 'Обновления о запуске',
      stayUpdated: 'Следите за обновлениями о запуске на Pump.fun',
      emailPlaceholder: 'Введите email',
      subscribe: 'Подписаться',
      copyright: '© 2025 $PRIKOL Token. Все права защищены.'
    },
    tokenomics: {
      title: 'Токеномика',
      subtitle: 'Справедливая и устойчивая экономическая модель на платформе Pump.fun',
      distribution: {
        title: 'Распределение при запуске',
        public: {
          title: 'Публичное распределение (90%)',
          description: 'Доступно через механизм честного запуска на Pump.fun'
        },
        development: {
          title: 'Разработка (5%)',
          description: 'Зарезервировано для будущего развития и интеграции платформы'
        },
        marketing: {
          title: 'Маркетинг (5%)',
          description: 'Выделено на маркетинг и рост сообщества'
        },
        noTeam: {
          title: 'Нет распределения команде',
          description: '100% справедливое распределение без токенов команды'
        }
      },
      bondingCurve: {
        title: 'Модель кривой связывания',
        dynamicPricing: 'Динамическое ценообразование',
        features: [
          'Цена растет с каждой покупкой',
          'Ранние участники получают лучшие цены',
          'Автоматическая генерация ликвидности'
        ],
        launch: {
          title: 'Параметры запуска',
          initialPrice: 'Начальная цена: $0.0001',
          noLimit: 'Без максимального лимита покупки',
          instant: 'Мгновенная торговля на Pump.fun'
        }
      },
      security: {
        title: 'Безопасность и защита',
        antiBot: {
          title: 'Защита от ботов',
          description: 'Продвинутые меры против манипуляций при запуске'
        },
        fairDistribution: {
          title: 'Честное распределение',
          description: 'Без пресейла, без токенов команды, 100% честный запуск'
        },
        priceStability: {
          title: 'Стабильность цены',
          description: 'Кривая связывания обеспечивает устойчивый рост цены'
        }
      }
    },
    roadmap: {
      title: 'Наш путь',
      subtitle: 'От запуска платформы до интеграции блокчейна - эволюция CallPrikol.ru',
      platformHistory: {
        title: 'История платформы',
        launch: {
          year: '2017',
          title: 'Запуск платформы',
          description: 'Успешный запуск CallPrikol.ru, создание фундамента для нашей платформы цифровых развлечений',
          achievements: [
            'Разработка инфраструктуры платформы',
            'Внедрение основных функций',
            'Привлечение начальной базы пользователей',
            'Создание правил сообщества'
          ]
        },
        growth: {
          year: '2017-2025',
          title: 'Рост на рынке',
          description: 'Достигнут значительный рост на рынке и увеличение базы пользователей',
          achievements: [
            'Больше миллиона активных пользователей',
            'Улучшение функций платформы',
            'Построение сильного сообщества',
            'Расширение категорий контента'
          ]
        }
      },
      currentDevelopment: {
        title: 'Текущая разработка (2025)',
        token: {
          title: 'Токен $PRIKOL',
          items: [
            'Запуск нативного токена на Solana',
            'Модель справедливого распределения',
            'Управление сообществом',
            'Механизмы вознаграждения'
          ]
        },
        security: {
          title: 'Безопасность и инфраструктура',
          items: [
            'Улучшенная безопасность платформы',
            'Улучшения масштабируемости',
            'Оптимизация производительности',
            'Защита от DDoS'
          ]
        },
        blockchain: {
          title: 'Интеграция блокчейна',
          items: [
            'Разработка смарт-контрактов',
            'Интеграция Web3 кошелька',
            'Функции полезности токена',
            'Кросс-чейн совместимость'
          ]
        }
      },
      futureVision: {
        title: 'Будущее видение (2025+)',
        phases: {
          q3: {
            phase: 'Q3 2025',
            title: 'Глобальное расширение',
            items: [
              'Внедрение поддержки нескольких языков',
              'Региональные партнерства по контенту',
              'Построение локальных сообществ',
              'Функции культурной адаптации'
            ]
          },
          q4: {
            phase: 'Q4 2025',
            title: 'Улучшение платформы',
            items: [
              'Продвинутая система рекомендаций контента',
              'Инструменты модерации на базе ИИ',
              'Интерактивные инструменты создания контента',
              'Улучшенные функции вовлечения пользователей'
            ]
          },
          q1: {
            phase: 'Q1 2026',
            title: 'Развитие экосистемы',
            items: [
              'Запуск маркетплейса создателей',
              'Интеграция NFT',
              'Децентрализованное хранение контента',
              'Продвинутые функции токеномики'
            ]
          }
        }
      }
    },
    announcement: {
      title: 'Запуск токена $PRIKOL',
      subtitle: 'Честный запуск на Pump.fun - Без пресейла, без токенов команды',
      launchDetails: {
        title: 'Детали запуска',
        date: 'Дата запуска: 8 марта 2025 в 15:00 UTC',
        price: 'Начальная цена: $0.0001',
        supply: 'Общее предложение: 1,000,000,000 PRIKOL',
        curve: 'Кривая связывания: Динамическое ценообразование на основе спроса',
        platform: 'Платформа: Эксклюзивный запуск на Pump.fun'
      },
      distribution: {
        title: 'Честное распределение',
        public: 'Публичное распределение: 90%',
        development: 'Разработка: 5%',
        marketing: 'Маркетинг: 5%',
        noTeam: 'Нет распределения команде'
      },
      bondingCurve: {
        title: 'Модель кривой связывания',
        dynamic: 'Динамическое ценообразование растет с каждой покупкой',
        early: 'Ранние участники получают лучшие цены',
        liquidity: 'Автоматическая генерация ликвидности',
        noLimit: 'Без максимального лимита покупки'
      },
      security: {
        title: 'Функции безопасности',
        antiBot: 'Продвинутая защита от ботов',
        fairLaunch: 'Механизм честного запуска',
        platform: 'Безопасность платформы Pump.fun'
      },
      howTo: {
        title: 'Как участвовать',
        step1: {
          title: 'Установите кошелек',
          description: 'Установите кошелек Phantom и добавьте SOL'
        },
        step2: {
          title: 'Посетите Pump.fun',
          description: 'Зайдите на Pump.fun во время запуска (8 марта 2025 15:00 UTC)'
        },
        step3: {
          title: 'Купите токены',
          description: 'Купите токены $PRIKOL за SOL или USDC - ранние покупки по лучшим ценам!'
        }
      }
    },
    contact: {
      title: 'Свяжитесь с нами',
      subtitle: 'Есть вопросы? Мы будем рады помочь. Отправьте нам сообщение, и мы ответим как можно скорее.',
      form: {
        name: {
          label: 'Имя',
          placeholder: 'Введите ваше имя',
          required: 'Имя обязательно'
        },
        email: {
          label: 'Email',
          placeholder: 'Введите ваш email',
          required: 'Email обязателен',
          invalid: 'Неверный формат email'
        },
        subject: {
          label: 'Тема',
          placeholder: 'Введите тему',
          required: 'Тема обязательна'
        },
        message: {
          label: 'Сообщение',
          placeholder: 'Введите ваше сообщение',
          required: 'Сообщение обязательно'
        },
        submit: 'Отправить сообщение'
      },
      info: {
        email: {
          title: 'Email',
          content: 'support@prikol.com'
        },
        telegram: {
          title: 'Telegram',
          content: '@prikoltoken'
        },
        location: {
          title: 'Локация',
          content: 'По всему миру'
        }
      }
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ru' ? 'ru' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    
    if (value === undefined) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}