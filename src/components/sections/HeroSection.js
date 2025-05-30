'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AIParticleBackground from '../three/AIParticleBackground';
import AITerminal from '../ui/AITerminal';
import { ArrowDown, Sparkles, Shield, Clock } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const terminalRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.set([titleRef.current, subtitleRef.current, terminalRef.current], {
        opacity: 0,
        y: 50
      });

      // Entrance animations
      const tl = gsap.timeline();
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(terminalRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.3");

      // Floating animations for decorative elements
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            duration: 2 + index * 0.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.3
          });
        }
      });

      // Scroll-triggered morphing
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(titleRef.current, {
            scale: 1 - progress * 0.1,
            opacity: 1 - progress * 0.5,
            duration: 0.3
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToFloatingRefs = (el) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background */}
      <AIParticleBackground />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space/20 to-space/80"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>

      {/* Floating Decorative Elements */}
      <div 
        ref={addToFloatingRefs}
        className="absolute top-20 left-10 w-16 h-16 border border-primary/30 rounded-full flex items-center justify-center glass"
      >
        <Shield className="w-8 h-8 text-primary" />
      </div>
      
      <div 
        ref={addToFloatingRefs}
        className="absolute top-32 right-16 w-12 h-12 border border-accent/30 rounded-lg flex items-center justify-center glass"
      >
        <Clock className="w-6 h-6 text-accent" />
      </div>

      <div 
        ref={addToFloatingRefs}
        className="absolute bottom-32 left-20 w-20 h-20 border border-secondary/30 rounded-full flex items-center justify-center glass"
      >
        <Sparkles className="w-10 h-10 text-secondary" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Hero Title */}
        <div ref={titleRef} className="mb-8">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Never Miss
            </span>
            <br />
            <span className="text-white text-glow-primary">
              A Warranty
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Again
            </span>
          </h1>
        </div>

        {/* Hero Subtitle */}
        <div ref={subtitleRef} className="mb-12">
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Smart AI assistant to track, manage, and remind you of all warranties, 
            services, and coverage across your entire digital and physical world.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
            <span className="px-4 py-2 glass rounded-full text-primary border border-primary/30">
              🤖 AI-Powered Extraction
            </span>
            <span className="px-4 py-2 glass rounded-full text-accent border border-accent/30">
              📱 Smart Reminders
            </span>
            <span className="px-4 py-2 glass rounded-full text-secondary border border-secondary/30">
              🏠 3D Inventory
            </span>
          </div>
        </div>

        {/* AI Terminal Demo */}
        <div ref={terminalRef} className="mb-12">
          <AITerminal />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 glow-primary">
            Start Free Trial
          </button>
          <button className="border border-primary/50 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
            Watch Demo
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Morphing Shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;
