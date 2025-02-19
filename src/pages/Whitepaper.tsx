import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
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

        // Remove animation classes and styles
        const elements = section.querySelectorAll('*');
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.transform = 'none';
            el.style.transition = 'none';
            el.style.animation = 'none';
            el.style.opacity = '1';

            // Remove data attributes
            Object.keys(el.dataset).forEach((key) => {
              delete el.dataset[key];
            });

            // Remove motion-specific classes
            el.classList.forEach((className) => {
              if (className.includes('motion') || className.includes('animate')) {
                el.classList.remove(className);
              }
            });
          }
        });

        // Add a new page for each section (except the first)
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
              const textElements = clonedSection.querySelectorAll(
                'p, h1, h2, h3, h4, h5, h6, span, li'
              );
              textElements.forEach((el) => {
                if (el instanceof HTMLElement) {
                  el.style.color = '#000000';
                  el.style.opacity = '1';
                }
              });

              // Enhance headings
              const headings = clonedSection.querySelectorAll('h1, h2, h3, h4, h5, h6');
              headings.forEach((heading) => {
                if (heading instanceof HTMLElement) {
                  heading.style.fontWeight = '700';
                  heading.style.marginBottom = '1rem';
                }
              });

              // Improve list items
              const listItems = clonedSection.querySelectorAll('li');
              listItems.forEach((item) => {
                if (item instanceof HTMLElement) {
                  item.style.marginBottom = '0.5rem';
                }
              });

              // Enhance cards
              const cards = clonedSection.querySelectorAll('[class*="rounded"]');
              cards.forEach((card) => {
                if (card instanceof HTMLElement) {
                  card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
                  card.style.borderRadius = '8px';
                  card.style.padding = '1rem';
                  card.style.margin = '0.5rem 0';
                }
              });
            }
          },
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
              Fair launch, bonding curve, and the path to meme greatness on Solana.
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
                        <a href="#introduction">1.1 Overview & Fair Launch</a>
                      </li>
                    </ul>
                    <h3 className="text-xl font-bold mt-8 mb-4">2. Meme Token Landscape</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#meme-landscape">2.1 Historical Context</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">3. Technical Architecture</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#technical-architecture">3.1 SPL Token & Smart Contracts</a>
                      </li>
                    </ul>
                    <h3 className="text-xl font-bold mt-8 mb-4">4. Tokenomics & Beyond</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#tokenomics">4.1 Fair Launch & Distribution</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#utility">5. Utility & Ecosystem</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#roadmap">6. Launch & Roadmap</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#security">7. Security Features</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#governance">8. Governance & Community</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#risk-factors">9. Risk Factors</a>
                      </li>
                      <li className="text-gray-600 hover:text-primary">
                        <a href="#conclusion">10. Conclusion</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Introduction */}
        <section id="introduction" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
            <p className="text-gray-600 mb-6">
              <strong>PRIKOL</strong> is a Solana-based meme token that combines the fun of
              internet culture with the speed and low fees of the Solana blockchain. The
              project aspires to cultivate a vibrant community, tapping into viral memes,
              NFTs, and broader crypto adoption.
            </p>
            <p className="text-gray-600 mb-6">
              Through a <strong>fair launch</strong> on Pump.fun, PRIKOL ensures that every
              participant starts on equal footing—there is no presale and no special token
              allocation for the team. This approach fosters trust, transparency, and
              widespread community ownership from day one.
            </p>
            <p className="text-gray-600 mb-6">
              PRIKOL’s vision is to redefine what a meme token can be by offering fair and
              transparent token distribution, community-driven growth, and an ecosystem that
              merges meme culture, NFTs, and other blockchain innovations on Solana.
            </p>
          </div>
        </section>

        {/* 2. Meme Token Landscape */}
        <section id="meme-landscape" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">2. Meme Token Landscape</h2>
            <p className="text-gray-600 mb-6">
              Meme tokens have shown the power of community-led promotions and viral
              marketing. Yet, many have suffered from short-lived hype cycles due to
              negligible utility, unequal distributions, and limited sustainability after
              the initial excitement fades.
            </p>
            <p className="text-gray-600 mb-6">
              <strong>PRIKOL</strong> tackles these challenges by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                Conducting a <strong>fair launch</strong>—no presale and no team tokens
              </li>
              <li>
                Offering <strong>transparent tokenomics</strong>, with no hidden allocations
              </li>
              <li>
                Fostering <strong>long-term value</strong> through community events, NFT
                drops, and potential future utility
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Technical Architecture */}
        <section id="technical-architecture" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">3. Technical Architecture</h2>
            <p className="text-gray-600 mb-6">
              PRIKOL uses the <strong>SPL (Solana Program Library)</strong> token standard,
              ensuring seamless integration with Solana wallets, decentralized exchanges
              (DEXs), and NFT platforms. Key parameters:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Symbol:</strong> PRIKOL
              </li>
              <li>
                <strong>Total Supply:</strong> 1,000,000,000
              </li>
              <li>
                <strong>Decimal Precision:</strong> Typically 9 on Solana
              </li>
            </ul>
            <p className="text-gray-600 mb-6">
              All tokens are minted at inception, with no further minting. Any future burns
              would be subject to community governance. To maintain integrity and trust,
              security audits and best practices (e.g., multi-sig for upgrade authority) are
              prioritized.
            </p>
          </div>
        </section>

        {/* 4. Tokenomics */}
        <section id="tokenomics" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">4. Tokenomics</h2>
            <h3 className="text-2xl font-bold mb-4">Fair Launch Details</h3>
            <p className="text-gray-600 mb-6">
              PRIKOL ensures fairness by having <strong>no presale</strong> and{' '}
              <strong>no team tokens</strong>. Everyone can purchase tokens at the same
              starting price on Pump.fun.
            </p>
            <h3 className="text-2xl font-bold mb-4">Distribution Breakdown</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Public Distribution:</strong> 80%
              </li>
              <li>
                <strong>Development:</strong> 10%
              </li>
              <li>
                <strong>Marketing:</strong> 10%
              </li>
              <li>
                <strong>Team Allocation:</strong> 0%
              </li>
            </ul>
            <h3 className="text-2xl font-bold mb-4">Bonding Curve Model</h3>
            <p className="text-gray-600 mb-6">
              PRIKOL employs a <strong>bonding curve</strong> during launch, which adjusts
              the token price dynamically based on demand:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Dynamic Pricing:</strong> Each purchase pushes the price slightly
                higher
              </li>
              <li>
                <strong>Automatic Liquidity Generation:</strong> Helps stabilize trading
                conditions
              </li>
              <li>
                <strong>No Maximum Buy Limit:</strong> Users can purchase any amount
              </li>
            </ul>
            <p className="text-gray-600 mb-6">
              The initial price is set at <strong>$0.0001</strong> per PRIKOL. As more
              tokens are bought, the bonding curve naturally increases the token price.
            </p>
          </div>
        </section>

        {/* 5. Utility & Ecosystem */}
        <section id="utility" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">5. Utility & Ecosystem</h2>
            <p className="text-gray-600 mb-6">
              At its core, PRIKOL aims to build a <strong>meme-driven community</strong>
              while integrating practical features:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Community Engagement:</strong> Meme contests, artwork competitions,
                and social media campaigns.
              </li>
              <li>
                <strong>NFT & Collectibles:</strong> PRIKOL-branded NFTs, cross-project
                collaborations, and potential in-game integrations.
              </li>
              <li>
                <strong>Future Expansion:</strong> Potential staking rewards, additional
                listings on DEXs/CEXs, and partnerships with DeFi or NFT platforms.
              </li>
            </ul>
          </div>
        </section>

        {/* 6. Launch & Roadmap */}
        <section id="roadmap" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">6. Launch & Roadmap</h2>
            <p className="text-gray-600 mb-6">
              PRIKOL’s fair launch on Pump.fun offers an advanced anti-bot mechanism and
              ensures a level playing field. The roadmap below outlines key milestones:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Phase 1:</strong> Token launch & bonding curve activation, initial
                liquidity setup.
              </li>
              <li>
                <strong>Phase 2:</strong> Listings on Solana DEXs, NFT collectible releases,
                meme competitions.
              </li>
              <li>
                <strong>Phase 3:</strong> Potential DAO formation, staking rewards (if
                approved), cross-chain bridges.
              </li>
              <li>
                <strong>Phase 4:</strong> Continued marketing, partnership expansions, and
                feature updates based on community feedback.
              </li>
            </ul>
          </div>
        </section>

        {/* 7. Security Features */}
        <section id="security" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">7. Security Features</h2>
            <p className="text-gray-600 mb-6">
              PRIKOL prioritizes safety and transparency through:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Smart Contract & Platform Audits:</strong> The SPL standard and
                optional audits for any custom contracts.
              </li>
              <li>
                <strong>Anti-Bot Protection:</strong> Pump.fun’s fair launch mechanism
                reduces front-running and bot activity.
              </li>
              <li>
                <strong>Ongoing Security Reviews:</strong> Regular code reviews, potential
                third-party audits, and community-based checks.
              </li>
            </ul>
          </div>
        </section>

        {/* 8. Governance & Community */}
        <section id="governance" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">8. Governance & Community</h2>
            <p className="text-gray-600 mb-6">
              PRIKOL is built on the premise that the <strong>community</strong> drives the
              project’s direction:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Community-Driven Development:</strong> Token holders can propose and
                vote on protocol changes, marketing campaigns, or partnerships.
              </li>
              <li>
                <strong>Transparency:</strong> Open communication through official channels
                (e.g., Twitter, Discord, Telegram).
              </li>
              <li>
                <strong>Financial Clarity:</strong> Clear reporting on how development and
                marketing funds (10% each) are utilized.
              </li>
            </ul>
          </div>
        </section>

        {/* 9. Risk Factors */}
        <section id="risk-factors" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">9. Risk Factors</h2>
            <p className="text-gray-600 mb-6">
              <strong>Market Volatility:</strong> Meme tokens can be subject to extreme price
              fluctuations.  
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Regulatory Uncertainty:</strong> Cryptocurrency regulations differ by
              jurisdiction and can rapidly evolve.
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Smart Contract Risks:</strong> Code vulnerabilities may emerge over
              time, highlighting the need for audits and community vigilance.
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Community Dependence:</strong> Meme tokens thrive on community
              engagement; diminished interest can affect long-term viability.
            </p>
          </div>
        </section>

        {/* 10. Conclusion */}
        <section id="conclusion" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">10. Conclusion</h2>
            <p className="text-gray-600 mb-6">
              PRIKOL Token embodies <strong>fairness, transparency, and fun</strong> on
              Solana’s high-performance blockchain. By adopting a fair launch, bonding curve,
              and robust security measures, PRIKOL aims to build a lasting community-driven
              ecosystem that merges the playful nature of meme culture with real token
              utility.
            </p>
            <p className="text-gray-600 mb-6">
              <em>Disclaimer: This document is for informational purposes only and does not
              constitute financial or legal advice. Participation in cryptocurrency projects
              entails risk—always conduct your own due diligence.</em>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
