'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const slideRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "The Problem",
      subtitle: "Warranty Management is Broken",
      content: {
        type: "problem",
        stats: [
          { value: "$2.1B", label: "Unclaimed warranties annually", color: "red-500" },
          { value: "70%", label: "People lose receipts", color: "red-500" },
          { value: "25+", label: "Items per household", color: "yellow-500" },
          { value: "0", label: "Unified solutions", color: "red-500" }
        ],
        painPoints: [
          "Lost receipts and warranty documents",
          "Forgotten expiration dates",
          "Complex claim processes",
          "No centralized tracking system"
        ]
      }
    },
    {
      id: 2,
      title: "Market Opportunity",
      subtitle: "$7.8B Market by 2030",
      content: {
        type: "market",
        marketSize: {
          current: 4.2,
          projected: 7.8,
          growth: "9.2% CAGR"
        },
        segments: [
          { name: "Consumer Electronics", value: 45, color: "primary" },
          { name: "Home Appliances", value: 30, color: "secondary" },
          { name: "Automotive", value: 15, color: "accent" },
          { name: "Other", value: 10, color: "white" }
        ]
      }
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "AI-Powered Warranty Management",
      content: {
        type: "solution",
        features: [
          {
            icon: <Zap className="w-8 h-8" />,
            title: "AI Receipt Scanning",
            description: "Instant warranty extraction with 99.9% accuracy"
          },
          {
            icon: <Shield className="w-8 h-8" />,
            title: "Smart Reminders",
            description: "Proactive notifications before expiration"
          },
          {
            icon: <Globe className="w-8 h-8" />,
            title: "3D Inventory",
            description: "Visualize items in AR/3D space"
          }
        ]
      }
    },
    {
      id: 4,
      title: "Business Model",
      subtitle: "Scalable SaaS Revenue Streams",
      content: {
        type: "business",
        tiers: [
          { name: "Free", price: 0, users: "100K+", revenue: 0 },
          { name: "Pro", price: 9.99, users: "10K+", revenue: 99900 },
          { name: "Premium", price: 19.99, users: "2K+", revenue: 39980 },
          { name: "Business", price: 99, users: "50+", revenue: 4950 }
        ],
        totalMRR: 144830
      }
    },
    {
      id: 5,
      title: "Competitive Analysis",
      subtitle: "Clear Market Leadership",
      content: {
        type: "competition",
        competitors: [
          { name: "WarrantyAI", ai: true, reminders: true, ar: true, claims: true, score: 95 },
          { name: "Bilt", ai: false, reminders: false, ar: false, claims: false, score: 40 },
          { name: "Everdence", ai: false, reminders: true, ar: false, claims: false, score: 50 },
          { name: "Sortly", ai: false, reminders: false, ar: false, claims: false, score: 35 }
        ]
      }
    },
    {
      id: 6,
      title: "Traction & Metrics",
      subtitle: "Strong Early Adoption",
      content: {
        type: "traction",
        metrics: [
          { label: "Beta Users", value: "5,000+", growth: "+150%" },
          { label: "Items Tracked", value: "25,000+", growth: "+300%" },
          { label: "Accuracy Rate", value: "99.9%", growth: "+0.5%" },
          { label: "User Retention", value: "85%", growth: "+15%" }
        ]
      }
    },
    {
      id: 7,
      title: "Financial Projections",
      subtitle: "Path to $100M ARR",
      content: {
        type: "financials",
        projections: [
          { year: "2024", users: "50K", revenue: "500K", expenses: "300K" },
          { year: "2025", users: "200K", revenue: "2.5M", expenses: "1.5M" },
          { year: "2026", users: "500K", revenue: "8M", expenses: "4M" },
          { year: "2027", users: "1M", revenue: "20M", expenses: "10M" }
        ]
      }
    },
    {
      id: 8,
      title: "Funding Ask",
      subtitle: "$5M Series A",
      content: {
        type: "funding",
        ask: 5000000,
        allocation: [
          { category: "Product Development", percentage: 40, amount: 2000000 },
          { category: "Marketing & Sales", percentage: 30, amount: 1500000 },
          { category: "Team Expansion", percentage: 20, amount: 1000000 },
          { category: "Operations", percentage: 10, amount: 500000 }
        ],
        milestones: [
          "Launch enterprise features",
          "Expand to 5 new markets",
          "Reach 1M active users",
          "Achieve $20M ARR"
        ]
      }
    }
  ];

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(slideRef.current, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentSlide]);

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  const renderSlideContent = () => {
    const { content } = currentSlideData;

    switch (content.type) {
      case "problem":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {content.stats.map((stat, index) => (
                <div key={index} className={`text-center p-6 bg-white/5 border border-${stat.color}/20 rounded-lg`}>
                  <div className={`text-3xl font-bold text-${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {content.painPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-white">{point}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "market":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">${content.marketSize.projected}B</div>
              <div className="text-xl text-white/80">Market size by 2030</div>
              <div className="text-accent">{content.marketSize.growth}</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {content.segments.map((segment, index) => (
                <div key={index} className={`text-center p-4 bg-${segment.color}/10 border border-${segment.color}/20 rounded-lg`}>
                  <div className={`text-2xl font-bold text-${segment.color} mb-2`}>{segment.value}%</div>
                  <div className="text-white/70 text-sm">{segment.name}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "solution":
        return (
          <div className="grid lg:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white/5 border border-white/10 rounded-lg hover:border-primary/30 transition-all duration-300">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-white text-lg mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        );

      case "business":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                ${content.totalMRR.toLocaleString()} MRR
              </div>
              <div className="text-white/70">Projected Monthly Recurring Revenue</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {content.tiers.map((tier, index) => (
                <div key={index} className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="font-semibold text-white mb-2">{tier.name}</div>
                  <div className="text-2xl font-bold text-primary mb-1">${tier.price}</div>
                  <div className="text-white/70 text-sm">{tier.users} users</div>
                  <div className="text-accent text-sm">${tier.revenue.toLocaleString()}/mo</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "traction":
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {content.metrics.map((metric, index) => (
              <div key={index} className="text-center p-6 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-white/70 mb-2">{metric.label}</div>
                <div className="text-accent text-sm">{metric.growth}</div>
              </div>
            ))}
          </div>
        );

      case "funding":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">
                ${(content.ask / 1000000).toFixed(1)}M
              </div>
              <div className="text-xl text-white/80">Series A Funding</div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-white mb-4">Fund Allocation</h3>
                <div className="space-y-3">
                  {content.allocation.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">{item.category}</span>
                      <div className="text-right">
                        <div className="text-primary font-semibold">{item.percentage}%</div>
                        <div className="text-white/70 text-sm">${(item.amount / 1000000).toFixed(1)}M</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Key Milestones</h3>
                <div className="space-y-3">
                  {content.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-white">{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-white">Content not available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space via-surface to-space">
      <Navigation />
      
      {/* Pitch Header */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                WarrantyAI
              </span>
            </h1>
            <p className="text-xl text-white/80">Investor Pitch Deck</p>
          </div>

          {/* Slide Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg transition-all duration-300"
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-primary">{isAutoPlay ? 'Pause' : 'Auto Play'}</span>
              </button>
            </div>

            <div className="text-white/60">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </section>

      {/* Main Slide */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={slideRef} className="glass rounded-lg border border-white/10 overflow-hidden">
            
            {/* Slide Header */}
            <div className="bg-surface/50 border-b border-white/10 p-8 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                {currentSlideData.title}
              </h2>
              <p className="text-xl text-white/80">{currentSlideData.subtitle}</p>
            </div>

            {/* Slide Content */}
            <div className="p-8">
              {renderSlideContent()}
            </div>
          </div>

          {/* Slide Navigation Dots */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary scale-125'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
