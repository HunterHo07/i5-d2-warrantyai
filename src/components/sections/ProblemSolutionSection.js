'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, CheckCircle, Receipt, Clock, Shield, Smartphone } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProblemSolutionSection = () => {
  const sectionRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split screen animation
      gsap.set([problemRef.current, solutionRef.current], {
        x: (index) => index === 0 ? -100 : 100,
        opacity: 0
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to([problemRef.current, solutionRef.current], {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
          });
        }
      });

      // Floating animation for icons
      gsap.to(".floating-icon", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    {
      icon: <Receipt className="w-8 h-8" />,
      title: "Lost Receipts",
      description: "70% of people lose or misplace important receipts and warranty documents"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Missed Deadlines",
      description: "Billions in unclaimed warranties due to forgotten expiration dates"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Manual Tracking",
      description: "Chaotic spreadsheets and sticky notes for managing multiple warranties"
    }
  ];

  const solutions = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "AI-Powered Scanning",
      description: "Instantly extract warranty info from receipts, emails, and photos"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Smart Reminders",
      description: "Never miss a warranty claim or service deadline again"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Centralized Management",
      description: "All your warranties, services, and coverage in one intelligent dashboard"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">The Problem</span>
            <span className="text-primary mx-4">→</span>
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Our Solution
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Warranty management is broken. We're fixing it with AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problem Side */}
          <div ref={problemRef} className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="font-heading text-3xl font-bold text-white mb-4">
                Current Pain Points
              </h3>
              <p className="text-white/70 text-lg">
                Managing warranties and service schedules is a nightmare for consumers and businesses alike.
              </p>
            </div>

            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-6 glass rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                >
                  <div className="floating-icon text-red-400 mt-1">
                    {problem.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-2">
                      {problem.title}
                    </h4>
                    <p className="text-white/70">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Problem Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 glass rounded-lg border border-red-500/20">
                <div className="text-2xl font-bold text-red-400">$2.1B</div>
                <div className="text-sm text-white/60">Unclaimed Warranties</div>
              </div>
              <div className="text-center p-4 glass rounded-lg border border-red-500/20">
                <div className="text-2xl font-bold text-red-400">70%</div>
                <div className="text-sm text-white/60">Lost Receipts</div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div ref={solutionRef} className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="font-heading text-3xl font-bold text-white mb-4">
                WarrantyAI Solution
              </h3>
              <p className="text-white/70 text-lg">
                Intelligent automation that transforms how you manage warranties and asset coverage.
              </p>
            </div>

            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-6 glass rounded-lg border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:glow-accent"
                >
                  <div className="floating-icon text-accent mt-1">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-2">
                      {solution.title}
                    </h4>
                    <p className="text-white/70">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Solution Benefits */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 glass rounded-lg border border-accent/20">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-sm text-white/60">Warranty Tracking</div>
              </div>
              <div className="text-center p-4 glass rounded-lg border border-accent/20">
                <div className="text-2xl font-bold text-accent">0</div>
                <div className="text-sm text-white/60">Missed Claims</div>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting Arrow */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center animate-pulse-glow">
            <span className="text-2xl">→</span>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-red-500/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-xl"></div>
    </section>
  );
};

export default ProblemSolutionSection;
