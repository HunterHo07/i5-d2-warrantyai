'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Camera, 
  Brain, 
  Bell, 
  Shield, 
  Smartphone, 
  Cloud, 
  Zap, 
  Eye,
  Calendar,
  FileText,
  Home,
  Car
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for feature cards
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 50,
        rotationX: 15
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
          });
        }
      });

      // 3D tilt effect on hover
      cardsRef.current.forEach(card => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              rotationY: 5,
              rotationX: -5,
              z: 50,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Smart Receipt Scanning",
      description: "AI-powered OCR extracts warranty info from any receipt, invoice, or document instantly.",
      color: "primary",
      category: "AI Technology"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Intelligent Recognition",
      description: "Machine learning identifies products, brands, models, and warranty terms automatically.",
      color: "secondary",
      category: "AI Technology"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Proactive Reminders",
      description: "Smart notifications before warranties expire, services are due, or claims need filing.",
      color: "accent",
      category: "Automation"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Warranty Protection",
      description: "Never lose warranty coverage again with secure cloud storage and backup.",
      color: "primary",
      category: "Protection"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "Scan receipts on-the-go with our mobile app. Works offline and syncs automatically.",
      color: "secondary",
      category: "Accessibility"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Sync",
      description: "Access your warranties anywhere, anytime. Secure cloud storage with encryption.",
      color: "accent",
      category: "Accessibility"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "3D Inventory View",
      description: "Visualize your items in 3D space. AR preview of your real-world inventory.",
      color: "primary",
      category: "Innovation"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Service Scheduling",
      description: "Automatic calendar integration for maintenance, repairs, and warranty claims.",
      color: "secondary",
      category: "Automation"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Claim Assistant",
      description: "Step-by-step guidance through warranty claims with document generation.",
      color: "accent",
      category: "Support"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Home Management",
      description: "Track appliances, HVAC, plumbing, and all home systems in one place.",
      color: "primary",
      category: "Categories"
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Vehicle Tracking",
      description: "Monitor car warranties, service schedules, and maintenance records.",
      color: "secondary",
      category: "Categories"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Setup",
      description: "Get started in minutes. Import existing data or start fresh with guided setup.",
      color: "accent",
      category: "Experience"
    }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Powerful Features</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Built for the Future
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Advanced AI technology meets intuitive design. Everything you need to manage warranties like a pro.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeFeature === index
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToCardsRefs}
              className="group perspective-1000"
            >
              <div className={`glass rounded-lg p-6 h-full border border-${feature.color}/20 hover:border-${feature.color}/40 transition-all duration-300 transform-gpu hover:glow-${feature.color} cursor-pointer`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br from-${feature.color}/20 to-transparent border border-${feature.color}/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${feature.color} group-hover:text-white transition-colors duration-300`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className={`text-xs uppercase tracking-wider text-${feature.color} mb-2 font-semibold`}>
                    {feature.category}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-3 group-hover:text-glow-primary transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 glass rounded-lg border border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-white/60 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center p-6 glass rounded-lg border border-secondary/20">
            <div className="text-3xl font-bold text-secondary mb-2">&lt; 2s</div>
            <div className="text-white/60 text-sm">Processing Time</div>
          </div>
          <div className="text-center p-6 glass rounded-lg border border-accent/20">
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-white/60 text-sm">Monitoring</div>
          </div>
          <div className="text-center p-6 glass rounded-lg border border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-white/60 text-sm">Items Tracked</div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-3/4 left-1/3 w-28 h-28 bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-xl animate-pulse delay-2000"></div>
    </section>
  );
};

export default FeaturesSection;
