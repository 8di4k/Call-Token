import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

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
            <h1 className="text-5xl font-bold mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-gray-600">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <ContactInfo
                  icon={<Mail className="w-6 h-6" />}
                  title={t('contact.info.email.title')}
                  content={t('contact.info.email.content')}
                  link="mailto:support@prikol.com"
                />
                <ContactInfo
                  icon={<MessageSquare className="w-6 h-6" />}
                  title={t('contact.info.telegram.title')}
                  content={t('contact.info.telegram.content')}
                  link="https://t.me/prikoltoken"
                />
                <ContactInfo
                  icon={<MapPin className="w-6 h-6" />}
                  title={t('contact.info.location.title')}
                  content={t('contact.info.location.content')}
                />
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.name.label')}
                      </label>
                      <input
                        {...register('name', { required: t('contact.form.name.required') })}
                        type="text"
                        placeholder={t('contact.form.name.placeholder')}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.email.label')}
                      </label>
                      <input
                        {...register('email', {
                          required: t('contact.form.email.required'),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('contact.form.email.invalid'),
                          },
                        })}
                        type="email"
                        placeholder={t('contact.form.email.placeholder')}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.subject.label')}
                    </label>
                    <input
                      {...register('subject', { required: t('contact.form.subject.required') })}
                      type="text"
                      placeholder={t('contact.form.subject.placeholder')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.message.label')}
                    </label>
                    <textarea
                      {...register('message', { required: t('contact.form.message.required') })}
                      rows={6}
                      placeholder={t('contact.form.message.placeholder')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    {t('contact.form.submit')}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactInfo({
  icon,
  title,
  content,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}) {
  const ContentWrapper = link ? 'a' : 'div';
  const props = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-start gap-4"
    >
      <div className="text-primary p-3 bg-orange-50 rounded-lg">{icon}</div>
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <ContentWrapper {...props} className="text-gray-600 hover:text-primary transition-colors">
          {content}
        </ContentWrapper>
      </div>
    </motion.div>
  );
}