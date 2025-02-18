import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Rocket, Shield, Users, Coins, Lock, Target, Globe, ArrowRight } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

export default function Whitepaper() {
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash && location.hash !== '') {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const generatePDF = async () => {
    if (!contentRef.current) return;

    try {
      const content = contentRef.current;
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;

      // Clone the content for PDF generation
      const clonedContent = content.cloneNode(true) as HTMLElement;
      
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '1200px'; // Fixed width for consistent rendering
      tempContainer.appendChild(clonedContent);
      document.body.appendChild(tempContainer);

      // Prepare content for PDF
      const sections = Array.from(clonedContent.querySelectorAll('section'));
      
      // Process each section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        // Remove all animation classes and styles
        const elements = section.querySelectorAll('*');
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            // Remove Framer Motion and animation related attributes
            el.style.transform = 'none';
            el.style.transition = 'none';
            el.style.animation = 'none';
            el.style.opacity = '1';
            
            // Remove data attributes
            Object.keys(el.dataset).forEach(key => {
              delete el.dataset[key];
            });

            // Remove motion-specific classes
            el.classList.forEach(className => {
              if (className.includes('motion') || className.includes('animate')) {
                el.classList.remove(className);
              }
            });
          }
        });

        // Add page break for new sections except the first one
        if (i > 0) {
          pdf.addPage();
        }

        // Capture the section
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 1200,
          onclone: (clonedDoc) => {
            const clonedSection = clonedDoc.querySelectorAll('section')[i];
            if (clonedSection) {
              // Apply print-specific styles
              clonedSection.style.padding = '20px';
              clonedSection.style.background = '#ffffff';
              
              // Improve text rendering
              const textElements = clonedSection.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
              textElements.forEach(el => {
                if (el instanceof HTMLElement) {
                  el.style.color = '#000000';
                  el.style.opacity = '1';
                }
              });

              // Enhance headings
              const headings = clonedSection.querySelectorAll('h1, h2, h3, h4, h5, h6');
              headings.forEach(heading => {
                if (heading instanceof HTMLElement) {
                  heading.style.fontWeight = '700';
                  heading.style.marginBottom = '1rem';
                }
              });

              // Improve list items
              const listItems = clonedSection.querySelectorAll('li');
              listItems.forEach(item => {
                if (item instanceof HTMLElement) {
                  item.style.marginBottom = '0.5rem';
                }
              });

              // Enhance cards
              const cards = clonedSection.querySelectorAll('[class*="rounded"]');
              cards.forEach(card => {
                if (card instanceof HTMLElement) {
                  card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
                  card.style.borderRadius = '8px';
                  card.style.padding = '1rem';
                  card.style.margin = '0.5rem 0';
                }
              });
            }
          }
        });

        // Calculate dimensions for the PDF
        const availableWidth = pdfWidth - 2 * margin;
        const availableHeight = pdfHeight - 2 * margin;
        
        const scale = Math.min(
          availableWidth / canvas.width,
          availableHeight / canvas.height
        );
        
        const scaledWidth = canvas.width * scale;
        const scaledHeight = canvas.height * scale;
        
        const x = (pdfWidth - scaledWidth) / 2;
        const y = (pdfHeight - scaledHeight) / 2;

        // Add the image to PDF
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight, undefined, 'FAST');
      }

      // Clean up
      document.body.removeChild(tempContainer);

      // Save the PDF
      pdf.save('PRIKOL-Whitepaper.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

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
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <FileText className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">$PRIKOL Whitepaper</h1>
            <p className="text-xl text-gray-600 mb-8">
              Technical documentation and vision for the most memeable token on Solana
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={generatePDF}
                className="bg-primary text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download PDF <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content to be converted to PDF */}
      <div ref={contentRef}>
        {/* Table of Contents */}
        <section className="py-20 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">1. Introduction</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#background">1.1 Background</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#vision">1.2 Vision & Mission</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#market">1.3 Market Analysis</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">2. Technical Details</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#token">2.1 Token Specifications</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#smart-contract">2.2 Smart Contract</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#security">2.3 Security Measures</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-20">
              {/* Introduction */}
              <div id="background">
                <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold mb-4">1.1 Background</h3>
                  <p className="text-gray-600 mb-6">
                    CallPrikol.ru has been a cornerstone of online entertainment in the CIS region since 2017, 
                    delivering viral pranks and memorable content to millions of users. The platform's success 
                    in creating engaging, community-driven content has led to the natural evolution into the 
                    blockchain space with the creation of $PRIKOL token.
                  </p>
                  <p className="text-gray-600 mb-6">
                    $PRIKOL represents the intersection of meme culture, entertainment, and decentralized finance, 
                    bringing the spirit of CallPrikol.ru to the Solana blockchain. This whitepaper outlines our 
                    vision, technical specifications, and roadmap for creating a sustainable and engaging token 
                    ecosystem.
                  </p>
                </div>

                <div id="vision" className="mt-12">
                  <h3 className="text-2xl font-bold mb-4">1.2 Vision & Mission</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <VisionCard
                      icon={<Target className="w-6 h-6" />}
                      title="Vision"
                      description="To become the leading entertainment-backed token in the Solana ecosystem, bridging traditional content platforms with blockchain technology."
                    />
                    <VisionCard
                      icon={<Users className="w-6 h-6" />}
                      title="Mission"
                      description="Empower our community with a token that reflects the fun, engaging spirit of CallPrikol.ru while providing real utility and value."
                    />
                  </div>
                </div>

                <div id="market" className="mt-12">
                  <h3 className="text-2xl font-bold mb-4">1.3 Market Analysis</h3>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-bold mb-4">Market Overview</h4>
                    <ul className="space-y-4">
                      <MarketPoint
                        title="Meme Token Market"
                        description="The meme token market cap exceeded $20 billion in 2024, showing significant growth potential."
                      />
                      <MarketPoint
                        title="Solana Ecosystem"
                        description="Solana's high performance and low fees make it ideal for community-driven tokens."
                      />
                      <MarketPoint
                        title="Entertainment Integration"
                        description="Growing trend of entertainment platforms launching their own tokens for enhanced user engagement."
                      />
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div id="token">
                <h2 className="text-3xl font-bold mb-6">2. Technical Details</h2>
                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">2.1 Token Specifications</h3>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SpecItem
                          label="Token Name"
                          value="$PRIKOL"
                        />
                        <SpecItem
                          label="Token Type"
                          value="SPL Token (Solana)"
                        />
                        <SpecItem
                          label="Total Supply"
                          value="1,000,000,000"
                        />
                        <SpecItem
                          label="Initial Price"
                          value="$0.0001"
                        />
                        <SpecItem
                          label="Launch Platform"
                          value="Pump.fun"
                        />
                        <SpecItem
                          label="Launch Date"
                          value="March 8, 2025 15:00 UTC"
                        />
                      </div>
                    </div>
                  </div>

                  <div id="smart-contract">
                    <h3 className="text-2xl font-bold mb-4">2.2 Smart Contract</h3>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h4 className="text-xl font-bold mb-4">Contract Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContractFeature
                          icon={<Lock className="w-6 h-6" />}
                          title="Security"
                          description="Audited by CertiK with time-locked liquidity and anti-bot measures"
                        />
                        <ContractFeature
                          icon={<Coins className="w-6 h-6" />}
                          title="Transaction Tax"
                          description="1% tax split between liquidity (0.5%) and marketing (0.5%)"
                        />
                        <ContractFeature
                          icon={<Shield className="w-6 h-6" />}
                          title="Anti-Dump"
                          description="Maximum transaction limits to prevent price manipulation"
                        />
                        <ContractFeature
                          icon={<Globe className="w-6 h-6" />}
                          title="Transparency"
                          description="Verified source code and public team information"
                        />
                      </div>
                    </div>
                  </div>

                  <div id="security">
                    <h3 className="text-2xl font-bold mb-4">2.3 Security Measures</h3>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <ul className="space-y-4">
                        <SecurityMeasure
                          title="Smart Contract Audit"
                          description="Complete audit by CertiK with all findings addressed"
                        />
                        <SecurityMeasure
                          title="Liquidity Lock"
                          description="Initial liquidity locked for 1 year through trusted third party"
                        />
                        <SecurityMeasure
                          title="Team KYC"
                          description="Team verified through trusted KYC provider"
                        />
                        <SecurityMeasure
                          title="Anti-Bot Protection"
                          description="Advanced measures to prevent bot manipulation at launch"
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function VisionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg"
      data-framer-motion
    >
      <div className="text-primary mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function MarketPoint({ title, description }: { title: string; description: string }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-start gap-4"
      data-framer-motion
    >
      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
      <div>
        <h5 className="font-bold mb-1">{title}</h5>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.li>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function ContractFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-start gap-4"
      data-framer-motion
    >
      <div className="text-primary">{icon}</div>
      <div>
        <h5 className="font-bold mb-1">{title}</h5>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

function SecurityMeasure({ title, description }: { title: string; description: string }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-start gap-4"
      data-framer-motion
    >
      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
      <div>
        <h5 className="font-bold mb-1">{title}</h5>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.li>
  );
}